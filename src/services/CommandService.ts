import { Command } from "../commands/Command";
import { LanguageService } from "../services/LanguageService";
import { CommandInfo } from "../language models/CommandInfo";
import { GenericMongoRepository } from "../database/repositories/GenericMongoRepository";
import { Guild } from "../database/models/Guild";
import { User } from "../database/models/User";
import { inject, injectAll, singleton } from "tsyringe";
import {
    CommandToken,
    GuildRepositoryToken,
    UserRepositoryToken,
} from "../tsyringe.config";

@singleton()
class CommandService {
    private _guildRepository: GenericMongoRepository<Guild>;
    private _userRepository: GenericMongoRepository<User>;
    private _languageService: LanguageService;
    private _commands: Command[];

    public get commands(): Command[] {
        return this._commands;
    }

    constructor(
        @inject(GuildRepositoryToken)
        guildRepository: GenericMongoRepository<Guild>,
        @inject(UserRepositoryToken)
        userRepository: GenericMongoRepository<User>,
        @injectAll(CommandToken) commands: Command[],
        languageService: LanguageService
    ) {
        this._guildRepository = guildRepository;
        this._userRepository = userRepository;
        this._commands = commands;
        this._languageService = languageService;
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
