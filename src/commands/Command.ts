import { FileUtils } from "../utils/FileUtils";
import { Client, Message } from "discord.js";
import { CommandServiceProvider } from "../providers/CommandServiceProvider";

abstract class Command {
    protected readonly _name: string;
    protected readonly _aliases: string[];
    protected readonly _botPermissions: string[];
    protected readonly _memberPermissions: string[];
    protected readonly _category: string;

    public get name(): string {
        return this._name;
    }
    public get aliases(): string[] {
        return this._aliases;
    }
    public get botPermissions(): string[] {
        return this._botPermissions;
    }
    public get memberPermissions(): string[] {
        return this._memberPermissions;
    }
    public get category(): string {
        return this._category;
    }

    constructor(
        name: string,
        aliases?: string[],
        botPermissions?: string[],
        memberPermissions?: string[]
    ) {
        this._name = name;
        this._aliases = aliases;
        this._botPermissions = botPermissions;
        this._memberPermissions = memberPermissions;

        this._category = FileUtils.getDirOfFile(
            FileUtils.findFile(__dirname, `${name}.js`)
        );
    }

    public abstract run(
        serviceProvider: CommandServiceProvider,
        client: Client,
        msg: Message,
        args?: string[]
    ): Promise<void>;
}

export { Command };
