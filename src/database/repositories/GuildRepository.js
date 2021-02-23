const MongoRepository = require("../MongoRepository.js");
const GuildModel = require("../models/Guild.js");

class GuildRepository extends MongoRepository {
    constructor() {
        super(GuildModel);
    }
}

module.exports = GuildRepository;