import { MongoRepository } from "./GenericMongoRepository";
import { User, UserModel } from "../models/User";
import { singleton } from "tsyringe";

@singleton()
class UserRepository extends MongoRepository<User> {
    constructor() {
        super(UserModel);
    }
}

export { UserRepository };
