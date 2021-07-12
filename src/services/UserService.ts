import { singleton } from "tsyringe";
import { User } from "../database/models/User";
import { UserRepository } from "../database/repositories/UserRepository";
import { BaseService } from "./BaseRepositoryService";

@singleton()
class UserService extends BaseService<User> {
    constructor(repository: UserRepository) {
        super(repository);
    }
}

export { UserService };
