import * as path from "path";
import * as fs from "fs";

abstract class FileUtils {
    public static getFiles(dir: string): string[] {
        const dirents = fs.readdirSync(dir, { withFileTypes: true });
        return dirents.flatMap((dirent) => {
            const res = path.resolve(dir, dirent.name);
            return dirent.isDirectory() ? FileUtils.getFiles(res) : res;
        });
    }

    public static findFile(dir: string, fileName: string): string {
        if (!dir || !fileName) return null;
        return this.getFiles(dir)?.find((p) =>
            p.toLowerCase().endsWith(fileName.toLowerCase())
        );
    }

    public static getFileExt(filePath: string): string {
        return path.parse(filePath).ext;
    }

    public static getFileName(
        filePath: string,
        withExtension: boolean
    ): string {
        if (withExtension == null) return path.parse(filePath).name;
        return path.parse(filePath).base;
    }

    static getDirOfFile(filePath: string): string {
        return path.parse(path.parse(filePath).dir).name;
    }

    static getDirName(dirPath: string): string {
        return path.parse(dirPath).name;
    }
}

export { FileUtils };
