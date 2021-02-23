const FileUtils = require("../utils/FileUtils.js");
const commandService = require("../services/commandService.js");

class Command {
    /**
     * @param {Object} options
     * @param {string} options.name
     * @param {Array<string>} options.aliases
     * @param {Array<string>} options.botPermissions
     * @param {Array<string>} options.memberPermissions
     */
    constructor(options) {
        this.name = options.name ?? "";
        this.aliases = options.aliases ?? [];
        this.botPermissions = options.botPermissions ?? [];
        this.memberPermissions = options.memberPermissions ?? [];
        this.category = FileUtils.getDirOfFile(FileUtils.findFile(__dirname, `${options.name}.js`));
    }

    /**
     * @param {string} language
     * @returns {string} 
     */
    getDescription(language) {
        return commandService.getCommandInfo(this.name, language)?.description ?? "";
    }

    /**
     * @param {string} language
     * @returns {Array<string>} 
     */
    getUsages(language) {
        return commandService.getCommandInfo(this.name, language)?.usages ?? "";
    }
}

module.exports = Command;