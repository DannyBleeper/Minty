class StringUtils {
    /**
     * @param {string} str
     * @return {string} 
     */
    static capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

module.exports = StringUtils;