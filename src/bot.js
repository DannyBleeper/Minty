require("dotenv").config();
const { Client } = require("discord.js");
const ResponseUtils = require("./utils/ResponseUtils.js");
const commandService = require("./services/commandService.js");
const mongoDb = require("./database/mongoDb.js");

const client = new Client();
commandService.init();

function msgMentionsBot(msg) {
    return msg.mentions.members.some(member => member.id === client.user.id)
        || msg.mentions.roles.some(role => msg.guild.member(client.user).roles.cache.has(role.id));
}

client.login(process.env.DISCORD_BOT_TOKEN);

client.on("ready", async () => {
    console.log(`${client.user.username} is running.`);

    await mongoDb.connect();
    
    mongoDb.saveGuilds(client.guilds);
});

client.on("guildCreate", async (guild) => {
    await mongoDb.guilds.insert({ _id: guild.id });
    mongoDb.saveMembers(guild.members);
});

client.on("message", async (msg) => {
    if (msg.author.bot) return;

    const prefix = await mongoDb.getPrefix(msg.guild.id);
    const language = await mongoDb.getLanguage(msg.guild.id);

    if (msg.content.startsWith(prefix)) {
        const [cmdName, ...args] = msg.content
            .trim()
            .substring(prefix.length)
            .split(/\s+/);
        
        const cmd = commandService.findCommand(cmdName);

        if (!cmd) return;

        await cmd.run(client, msg, args);
    } else if (msgMentionsBot(msg)) {
        const response = ResponseUtils.getResponse(language, msg);
        if (response) msg.channel.send(response);
    }
});