const FileUtils = require("../utils/FileUtils.js");
const LanguageUtils = require("../utils/LanguageUtils.js");

class CommandService {
    constructor() {
        /**
         * @typedef {import("../commands/Command")} Command
         * @type {Array<Command>}
         */
        this.commands = [];
    }

    init() {
        this.commands = FileUtils.getFiles("./src/commands")
            .filter(c => !c.endsWith("Command.js"))
            .map(path => {
                const Command = require(path);
                return new Command();
            });
    }
    
    /**
     * @typedef {import("../commands/Command.js")} Command
     * @param {string} commandName
     * @returns {Command}
     */
    findCommand(commandName) {
        return this.commands.find(
            cmd => cmd.name === commandName
         || cmd.aliases.some(a => a === commandName)
        );
    }

    /**
     * @param {string} commandName
     * @param {string} language
     * @returns {{description: string, usages: Array<string>}}
     */
    getCommandInfo(commandName, language) {
        const commands = LanguageUtils.getEntries(language)?.commands;

        if (!commands) return null;
        
        return commands[commandName];
    }
}

module.exports = new CommandService();