class MongoRepository {
    constructor(model) {
        this.model = model;
        model.init();
    }

    insert(entity) {
        return this.model.create(entity);
    }

    findOne(id, projection) {
        return this.model.findById(id, projection).exec();
    }

    find(id, projection) {
        return this.model.find(id, projection).exec();
    }

    all(projection) {
        return this.model.find({}, projection).exec();
    }

    remove(id) {
        return this.model.findByIdAndRemove(id).exec();
    }

    upsert(entity, options = { upsert: true, new: true, setDefaultsOnInsert: true }) {
        return this.model.findOneAndUpdate({ _id: entity._id }, entity, options);
    }
}

module.exports = MongoRepository;