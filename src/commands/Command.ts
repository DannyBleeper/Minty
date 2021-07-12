import { FileUtils } from "../utils/FileUtils";
import { CommandService } from "../services/commandService";
import { GuildService } from "../services/GuildService";
import { UserService } from "../services/UserService";
import { Client, Message } from "discord.js";
import { EmbedService } from "../services/EmbedService";

abstract class Command {
    protected readonly _commandService: CommandService;
    protected readonly _guildService: GuildService;
    protected readonly _userService: UserService;
    protected readonly _embedService: EmbedService;
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
        commandService: CommandService,
        guildService: GuildService,
        userService: UserService,
        embedService: EmbedService,
        name: string,
        aliases?: string[],
        botPermissions?: string[],
        memberPermissions?: string[]
    ) {
        this._commandService = commandService;
        this._guildService = guildService;
        this._userService = userService;
        this._embedService = embedService;
        this._name = name;
        this._aliases = aliases;
        this._botPermissions = botPermissions;
        this._memberPermissions = memberPermissions;

        this._category = FileUtils.getDirOfFile(
            FileUtils.findFile(__dirname, `${name}.js`)
        );
    }

    public getDescription(language: string): string {
        return (
            this._commandService.findInfo(this._name, language)?.description ??
            ""
        );
    }

    public getUsages(language: string): string[] {
        return this._commandService.findInfo(this._name, language)?.usages;
    }

    public abstract run(
        client: Client,
        msg: Message,
        args?: string[]
    ): Promise<void>;
}

export { Command };
