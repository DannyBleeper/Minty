import { inject, singleton } from "tsyringe";
import { Guild } from "../database/models/Guild";
import { User } from "../database/models/User";
import { BaseDiscordRepositoryService } from "../services/BaseDiscordRepositoryService";
import { CommandService } from "../services/CommandService";
import { EmbedService } from "../services/EmbedService";
import { GuildServiceToken, UserServiceToken } from "../tsyringe.config";

@singleton()
class CommandServiceProvider {
    public readonly commandService: CommandService;
    public readonly guildService: BaseDiscordRepositoryService<Guild>;
    public readonly userService: BaseDiscordRepositoryService<User>;
    public readonly embedService: EmbedService;

    constructor(
        commandService: CommandService,
        @inject(GuildServiceToken)
        guildService: BaseDiscordRepositoryService<Guild>,
        @inject(UserServiceToken)
        userService: BaseDiscordRepositoryService<User>,
        embedService: EmbedService
    ) {
        this.commandService = commandService;
        this.guildService = guildService;
        this.userService = userService;
        this.embedService = embedService;
    }
}

export { CommandServiceProvider };
