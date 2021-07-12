import { Command } from "../commands/Command";
import { LanguageService } from "../services/LanguageService";
import { CommandInfo } from "../language models/CommandInfo";
import { GuildRepository } from "../database/repositories/GuildRepository";
import { UserRepository } from "../database/repositories/UserRepository";
import { container, singleton } from "tsyringe";
import { CommandToken, registerCommands } from "../tsyringe.config";

@singleton()
@registerCommands()
class CommandService {
    private _guildRepository: GuildRepository;
    private _userRepository: UserRepository;
    private _languageService: LanguageService;
    private _commands: Command[];

    public get commands(): Command[] {
        return this._commands;
    }

    constructor(
        guildRepository: GuildRepository,
        userRepository: UserRepository,
        languageService: LanguageService
    ) {
        this._guildRepository = guildRepository;
        this._userRepository = userRepository;
        this._languageService = languageService;
    }

    public init(): void {
        this._commands = container.resolveAll<Command>(CommandToken);
    }

    public find(commandName: string): Command {
        return this._commands.find(
            (cmd) =>
                cmd.name === commandName ||
                cmd.aliases.some((a) => a === commandName)
        );
    }

    public findInfo(commandName: string, language: string): CommandInfo {
        return this._languageService
            .getCommandInfoList(language)
            ?.find((c) => c.name == commandName);
    }
}

export { CommandService };
