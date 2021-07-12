abstract class ParseUtils {
    public static parse(
        str: string,
        data: { mention?: string; prefix?: string }
    ): string {
        const strings = {
            "{{mention}}": data.mention,
            "{{prefix}}": data.prefix,
        };

        let parsedStr = str;

        Object.keys(strings).forEach((key) => {
            parsedStr = parsedStr.replace(new RegExp(key, "g"), strings[key]);
        });

        return parsedStr;
    }
}

export { ParseUtils };
