import { ParseArgs } from "./ParseArgs";

abstract class ParseUtils {
    public static parse(str: string, args: ParseArgs): string {
        if (!str) return;

        Object.keys(args).forEach((key) => {
            if (!key || key == "") return;
            str = str.replace(new RegExp(`{{${key}}}`, "g"), args[key]);
        });

        return str;
    }
}

export { ParseUtils };
