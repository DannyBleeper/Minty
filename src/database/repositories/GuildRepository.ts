import { MongoRepository } from "./GenericMongoRepository";
import { Guild, GuildModel } from "../models/Guild";
import { singleton } from "tsyringe";

@singleton()
class GuildRepository extends MongoRepository<Guild> {
    constructor() {
        super(GuildModel);
    }
}

export { GuildRepository };
