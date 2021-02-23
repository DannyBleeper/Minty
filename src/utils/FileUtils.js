const path = require("path");
const fs = require("fs");

class FileUtils {
    /**
     * @static
     * @param {string} dir
     * @return {Array<string>} 
     */
    static getFiles(dir) {
        const dirents = fs.readdirSync(dir, { withFileTypes: true });
        return dirents.flatMap((dirent) => {
            const res = path.resolve(dir, dirent.name);
            return dirent.isDirectory() ? FileUtils.getFiles(res) : res;
        });
    }

    /**
     * @static
     * @param {string} dir
     * @param {string} fileName
     * @returns {string} found file path
     */
    static findFile(dir, fileName) {
        if (!dir || !fileName) return null;
        return this.getFiles(dir)?.find(p => p.endsWith(fileName));
    }

    /**
     * @param {string} filePath 
     * @returns {string}
     */
    static getFileExt(filePath) {
        return path.parse(filePath).ext;
    }

    /**
     * @param {string} filePath 
     * @param {Boolean} withExtension
     * @returns {string}
     */
    static getFileName(filePath, withExtension) {
        if (withExtension == null) return path.parse(filePath).name;
        return path.parse(filePath).base;
    }

    /**
     * @param {string} filePath
     * @returns {string} 
     */
    static getDirOfFile(filePath) {
        return path.parse(path.parse(filePath).dir).name;
    }

    /**
     * @param {string} dirPath
     * @returns {string} 
     */
    static getDirName(dirPath) {
        return path.parse(dirPath).name;
    }
}

module.exports = FileUtils;