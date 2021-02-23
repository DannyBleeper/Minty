class RegexUtils {
    /**
     * @static
     * @param {string} str
     * @return {RegExp} 
     */
    static strToRegex(str) {
        const main = str.match(/\/(.+)\/.*/);
        const options = str.match(/\/.+\/(.*)/);
        if (main) return new RegExp(main[1], options ? options[1] : null);
        return new RegExp(str);
    }
}

module.exports = RegexUtils;