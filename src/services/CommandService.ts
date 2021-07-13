import { Command } from "../commands/Command";
import { LanguageService } from "../services/LanguageService";
import { CommandInfo } from "../language models/CommandInfo";
import { MongoRepository } from "../database/repositories/GenericMongoRepository";
import { Guild } from "../database/models/Guild";
import { User } from "../database/models/User";
import { container, inject, singleton } from "tsyringe";
import {
    CommandToken,
    GuildRepositoryToken,
    UserRepositoryToken,
} from "../tsyringe.config";
import { registerCommands } from "../decorators/DI";

@singleton()
@registerCommands()
class CommandService {
    private _guildRepository: MongoRepository<Guild>;
    private _userRepository: MongoRepository<User>;
    private _languageService: LanguageService;
    private _commands: Command[];

    public get commands(): Command[] {
        return this._commands;
    }

    constructor(
        @inject(GuildRepositoryToken) guildRepository: MongoRepository<Guild>,
        @inject(UserRepositoryToken) userRepository: MongoRepository<User>,
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
