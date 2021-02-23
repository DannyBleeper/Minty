const fs = require("fs");
const path = require("path");
const filewatcher = require("filewatcher");

const localesPath = "./src/locales";
const watcher = filewatcher();
fs.readdirSync(localesPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .forEach(dirent => {
        fs.readdirSync(path.join(localesPath, dirent.name))
            .forEach(fileName => {
                watcher.add(path.join(localesPath, dirent.name, fileName));
            });
    });

/**
 * @returns {Array<{language: String}>}
 */
function getLanguageEntries() {
    return fs
        .readdirSync(localesPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => {
            const obj = { language: dirent.name };
            fs.readdirSync(path.join(localesPath, dirent.name))
                .forEach(fileName => {
                    obj[path.parse(fileName).name] = JSON.parse(
                        fs.readFileSync(path.join(localesPath, dirent.name, fileName))
                    );
                });
            return obj;
        });
}

let languageEntries = getLanguageEntries();

watcher.on("change", (file) => {
    console.log("File modified: %s", file);
    languageEntries = getLanguageEntries();
});

class LanguageUtils {
    /**
     * @static
     * @param {string} language
     * @returns {{language: String}}
     */
    static getEntries(language) {
        return languageEntries.find(entry => entry.language === language);
    }
}

module.exports = LanguageUtils;