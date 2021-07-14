import { inject, singleton } from "tsyringe";
import { Guild } from "../database/models/Guild";
import { User } from "../database/models/User";
import { BaseRepositoryService } from "../services/BaseRepositoryService";
import { CommandService } from "../services/CommandService";
import { EmbedService } from "../services/EmbedService";
import { GuildServiceToken, UserServiceToken } from "../tsyringe.config";

@singleton()
class CommandServiceProvider {
    public readonly commandService: CommandService;
    public readonly guildService: BaseRepositoryService<Guild>;
    public readonly userService: BaseRepositoryService<User>;
    public readonly embedService: EmbedService;

    constructor(
        commandService: CommandService,
        @inject(GuildServiceToken) guildService: BaseRepositoryService<Guild>,
        @inject(UserServiceToken) userService: BaseRepositoryService<User>,
        embedService: EmbedService
    ) {
        this.commandService = commandService;
        this.guildService = guildService;
        this.userService = userService;
        this.embedService = embedService;
    }
}

export { CommandServiceProvider };
