import * as fs from "fs";
import * as path from "path";
import { FSWatcher, watch } from "chokidar";
import { CommandInfo } from "../language models/CommandInfo";
import { ResponseInfo } from "../language models/ResponseInfo";
import { MiscInfo } from "../language models/MiscInfo";
import { singleton } from "tsyringe";

@singleton()
class LanguageService {
    private _commands: Record<string, CommandInfo[]> = {};
    private _responses: Record<string, ResponseInfo[]> = {};
    private _miscEntries: Record<string, MiscInfo[]> = {};

    private readonly _watcher: FSWatcher;
    private readonly _localesPath = "./locales";

    constructor() {
        const filesToWatch: string[] = [];

        fs.readdirSync(this._localesPath, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .forEach((dirent) => {
                fs.readdirSync(
                    path.join(this._localesPath, dirent.name)
                ).forEach((fileName) => {
                    filesToWatch.push(
                        path.join(this._localesPath, dirent.name, fileName)
                    );
                });
            });

        this._watcher = watch(filesToWatch);

        this._watcher.on("change", (file) => {
            console.log("File modified: %s", file);
            this.updateLanguageEntries();
        });

        this.updateLanguageEntries();
    }

    public getCommandInfoList(language: string): CommandInfo[] {
        return this._commands[language];
    }

    public getResponseInfoList(language: string): ResponseInfo[] {
        return this._responses[language];
    }

    public getMiscInfoList(language: string): MiscInfo[] {
        return this._miscEntries[language];
    }

    public findMiscText(language: string, name: string): string {
        return this._miscEntries[language]?.find((m) => m.name == name)?.text;
    }

    private updateLanguageEntries(): void {
        fs.readdirSync(this._localesPath, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .forEach((dirent) => {
                const languageName = dirent.name;

                fs.readdirSync(
                    path.join(this._localesPath, languageName)
                ).forEach((filePath) => {
                    const fileName = path.parse(filePath).name;
                    const list: unknown = JSON.parse(
                        fs
                            .readFileSync(
                                path.join(
                                    this._localesPath,
                                    languageName,
                                    filePath
                                )
                            )
                            .toString("utf8")
                    );

                    switch (fileName) {
                        case "commands":
                            this._commands[languageName] =
                                list as CommandInfo[];
                            break;
                        case "responses":
                            this._responses[languageName] =
                                list as ResponseInfo[];
                            break;
                        case "misc":
                            this._miscEntries[languageName] =
                                list as MiscInfo[];
                            break;
                    }
                });
            });
    }
}

export { LanguageService };
