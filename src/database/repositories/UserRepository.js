const MongoRepository = require("../MongoRepository.js");
const UserModel = require("../models/User.js");

class UserRepository extends MongoRepository {
    constructor() {
        super(UserModel);
    }
}

module.exports = UserRepository;