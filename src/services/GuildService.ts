import { Guild } from "../database/models/Guild";
import { GuildRepository } from "../database/repositories/GuildRepository";
import { BaseDiscordRepositoryService } from "./BaseDiscordRepositoryService";
import { singleton } from "tsyringe";

@singleton()
class GuildService extends BaseDiscordRepositoryService<Guild> {
    constructor(repository: GuildRepository) {
        super(repository);
    }
}

export { GuildService };
