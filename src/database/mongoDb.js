const mongoose = require("mongoose");
const GuildRepository = require("./repositories/GuildRepository.js");
const UserRepository = require("./repositories/UserRepository.js");

class MongoDB {
    constructor() {
        mongoose.set("useFindAndModify", false);
        this.mongoose = mongoose;
    }

    async connect() {
        return mongoose.connect(process.env.MONGODB_URI,
            { useNewUrlParser: true, useUnifiedTopology: true })
            .then(
                () => {
                    this.guilds = new GuildRepository();
                    this.users = new UserRepository();
                },
                err => console.log(err)
            );
    }

    saveMembers(members) {
        members.cache.each(async (member) => {
            await this.users.upsert({ _id: member.id });
        });
    }
    
    saveGuilds(guilds) {
        guilds.cache.each(async (guild) => {
            await this.guilds.upsert({ _id: guild.id });
            this.saveMembers(guild.members);
        });
    }
    
    async getLanguage(guildId) {
        return (await this.guilds.findOne(guildId)).language;
    }
    
    async getPrefix(guildId) {
        return (await this.guilds.findOne(guildId)).prefix;
    }
}

module.exports = new MongoDB();