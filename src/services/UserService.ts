import { singleton } from "tsyringe";
import { User } from "../database/models/User";
import { UserRepository } from "../database/repositories/UserRepository";
import { BaseDiscordRepositoryService } from "./BaseDiscordRepositoryService";

@singleton()
class UserService extends BaseDiscordRepositoryService<User> {
    constructor(repository: UserRepository) {
        super(repository);
    }
}

export { UserService };
