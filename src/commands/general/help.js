const Command = require("../Command.js");
const ParseUtils = require("../../utils/ParseUtils.js");
const GroupUtils = require("../../utils/GroupUtils.js");
const StringUtils = require("../../utils/StringUtils.js");
const EmbedUtils = require("../../utils/EmbedUtils.js");
const mongoDb = require("../../database/mongoDb.js");
const commandService = require("../../services/commandService.js");

class Help extends Command {
    constructor() {
        super({
            name: "help",
            aliases: ["h", "помощь", "помоги"],
            botPermissions: ["SEND_MESSAGES"]
        });
    }

    /**
     * @typedef {import("discord.js").Client} Client
     * @typedef {import("discord.js").Message} Message
     * @param {Client} client
     * @param {Message} msg
     * @param {Array<string>} args
     */
    async run(client, msg, args) {
        const prefix = await mongoDb.getPrefix(msg.guild.id);
        const language = await mongoDb.getLanguage(msg.guild.id);
        
        let embed;
        
        if (!args || args.length === 0) {
            embed = EmbedUtils.getCommandsListEmbed(commandService.commands, prefix, language);
        } else {
            const cmdName = args[0];
            if (cmdName) {
                const cmd = commandService.findCommand(cmdName);
                embed = EmbedUtils.getCommandInfoEmbed(cmd, prefix, language);
            }
        }

        if (embed) {
            msg.channel.send(embed);
        } else {
            msg.channel.send("Embed was empty.");
        }
    }
}

module.exports = Help;