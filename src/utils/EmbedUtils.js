const { MessageEmbed } = require("discord.js");
const ParseUtils = require("./ParseUtils.js");
const GroupUtils = require("./GroupUtils.js");
const StringUtils = require("./StringUtils.js");
const LanguageUtils = require("./LanguageUtils.js");

const INFO_COLOR = "GREEN";
const ERROR_COLOR = "RED";
const WARN_COLOR = "YELLOW";

class EmbedUtils {
    /**
     * @typedef {import("../commands/Command")} Command
     * @param {Command} cmd
     * @param {string} prefix
     * @param {string} language
     * @returns {MessageEmbed}
     */
    static getCommandInfoEmbed(cmd, prefix, language) {
        const cmdDescription = cmd.getDescription(language);
        const cmdUsages = cmd.getUsages(language).map(
            u => ParseUtils.parse(u, { prefix })
        );
        const { misc } = LanguageUtils.getEntries(language);

        return new MessageEmbed()
            .setColor(INFO_COLOR)
            .setTitle(cmd.name)
            .setDescription(cmdDescription)
            .addFields(
                { name: misc.usage, value: cmdUsages.map(u => `\`${u}\``).join("\n"), inline: true },
                { name: misc.aliases, value: `\`${cmd.aliases.join(", ")}\``, inline: true }
            );
    }

    /**
     * @typedef {import("../commands/Command")} Command
     * @param {Array<Command>} commands 
     * @param {string} language
     * @returns {MessageEmbed}
     */
    static getCommandsListEmbed(commands, prefix, language) {
        const groupedCmds = GroupUtils.groupBy(commands, cmd => cmd.category);
        const { misc } = LanguageUtils.getEntries(language);

        const embed = new MessageEmbed()
            .setColor(INFO_COLOR)
            .addFields(
                Object.keys(groupedCmds).map(groupName => ({
                    name: `${StringUtils.capitalizeFirstLetter(groupName)}`,
                    value: `\`${groupedCmds[groupName].map(cmd => cmd.name).join(", ")}\``
                }))
            )
            .addField("‎‎‏‏‎ ‎", ParseUtils.parse(misc.helpHint, { prefix }));
        return embed;
    }
}

module.exports = EmbedUtils;