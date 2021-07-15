import { FilterQuery, Model } from "mongoose";

abstract class GenericMongoRepository<T> {
    private readonly _model: Model<T>;

    constructor(model: Model<T>) {
        this._model = model;
    }

    public async insert(doc: T): Promise<T> {
        return await this._model.create(doc);
    }

    public async insertMany(docs: T[]): Promise<T[]> {
        try {
            return await this._model.insertMany(docs);
        } catch (err) {
            // catch error when inserting multiple duplicate keys
            return null;
        }
    }

    public async findOne(filter: FilterQuery<T>): Promise<T> {
        return await this._model.findOne(filter).exec();
    }

    public async find(filter: FilterQuery<T>): Promise<T[]> {
        return await this._model.find(filter).exec();
    }

    public async all(): Promise<T[]> {
        return await this._model.find({}).exec();
    }

    public async delete(filter: FilterQuery<T>): Promise<T> {
        return await this._model.findOneAndDelete(filter).exec();
    }

    public async deleteMany(filter: FilterQuery<T>): Promise<number> {
        return (await this._model.deleteMany(filter).exec())?.deletedCount;
    }

    public async upsert(filter: FilterQuery<T>, doc: T): Promise<T> {
        return await this._model
            .findOneAndUpdate(filter, doc, {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true,
            })
            .exec();
    }
}

export { GenericMongoRepository };
