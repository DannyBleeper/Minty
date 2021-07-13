import { singleton } from "tsyringe";
import { User } from "../database/models/User";
import { UserRepository } from "../database/repositories/UserRepository";
import { BaseRepositoryService } from "./BaseRepositoryService";

@singleton()
class UserService extends BaseRepositoryService<User> {
    constructor(repository: UserRepository) {
        super(repository);
    }
}

export { UserService };
