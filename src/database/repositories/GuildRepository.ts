import { GenericMongoRepository } from "./GenericMongoRepository";
import { Guild, GuildModel } from "../models/Guild";
import { singleton } from "tsyringe";

@singleton()
class GuildRepository extends GenericMongoRepository<Guild> {
    constructor() {
        super(GuildModel);
    }
}

export { GuildRepository };
