abstract class RegexUtils {
    public static strToRegex(str: string): RegExp {
        const main = str.match(/\/(.+)\/.*/);
        const options = str.match(/\/.+\/(.*)/);
        if (main) return new RegExp(main[1], options ? options[1] : null);
        return new RegExp(str);
    }
}

export { RegexUtils };
