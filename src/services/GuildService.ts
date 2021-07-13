import { Guild } from "../database/models/Guild";
import { GuildRepository } from "../database/repositories/GuildRepository";
import { BaseRepositoryService } from "./BaseRepositoryService";
import { singleton } from "tsyringe";

@singleton()
class GuildService extends BaseRepositoryService<Guild> {
    constructor(repository: GuildRepository) {
        super(repository);
    }
}

export { GuildService };
