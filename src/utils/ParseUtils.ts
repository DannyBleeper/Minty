abstract class ParseUtils {
    public static parse(
        str: string,
        data: { mention?: string; prefix?: string }
    ): string {
        if (!str) return;

        const strings = {
            "{{mention}}": data.mention,
            "{{prefix}}": data.prefix,
        };

        Object.keys(strings).forEach((key) => {
            str = str.replace(new RegExp(key, "g"), strings[key]);
        });

        return str;
    }
}

export { ParseUtils };
