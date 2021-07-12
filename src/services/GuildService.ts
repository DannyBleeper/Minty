import { Guild } from "../database/models/Guild";
import { GuildRepository } from "../database/repositories/GuildRepository";
import { BaseService } from "./BaseRepositoryService";
import { singleton } from "tsyringe";

@singleton()
class GuildService extends BaseService<Guild> {
    constructor(repository: GuildRepository) {
        super(repository);
    }
}

export { GuildService };
