class ParseUtils {
    /**
     * @static
     * @param {string} str
     * @param {{mention: string, prefix: string}}
     * @returns {string}
     */
    static parse(str, { mention, prefix }) {
        const strings = {
            "{{mention}}": mention,
            "{{prefix}}": prefix
        };

        let parsedStr = str;

        Object.keys(strings).forEach(key => {
            parsedStr = parsedStr.replaceAll(key, strings[key]);
        });

        return parsedStr;
    }
}

module.exports = ParseUtils;