import { GenericMongoRepository } from "./GenericMongoRepository";
import { User, UserModel } from "../models/User";
import { singleton } from "tsyringe";

@singleton()
class UserRepository extends GenericMongoRepository<User> {
    constructor() {
        super(UserModel);
    }
}

export { UserRepository };
