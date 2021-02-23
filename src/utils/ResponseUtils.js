const LanguageUtils = require("./LanguageUtils.js");
const RegexUtils = require("./RegexUtils.js");
const RandomUtils = require("./RandomUtils.js");
const ParseUtils = require("./ParseUtils.js");
const mongoDb = require("../database/mongoDb.js");

class ResponseUtils {
    /**
     * @static
     * @typedef {import("discord.js").Message} Message
     * @param {string} language
     * @param {Message} msg
     * @return {string}
     */
    static getResponse(language, msg) {
        const responseEntries = LanguageUtils.getEntries(language).responses;
        const regex = Object.keys(responseEntries)
            .find(r => RegexUtils.strToRegex(r)?.test(msg.content));
        
        if (!regex) return null;
        
        return ParseUtils.parse(
            RandomUtils.getRandomElement(responseEntries[regex]),
            {
                mention: msg.author,
                prefix: mongoDb.getPrefix(msg.guild.id)
            }
        );
    }
}

module.exports = ResponseUtils;