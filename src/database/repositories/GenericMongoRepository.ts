import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { BaseModel } from "../models/BaseModel";

abstract class GenericMongoRepository<T extends BaseModel> {
    private readonly _model: Model<T>;

    constructor(model: Model<T>) {
        this._model = model;
    }

    public async insert(doc: T): Promise<T> {
        if (this._model.findById(doc._id)) return null;
        return await this._model.create(doc);
    }

    public async findOne(id: string, projection?: string): Promise<T> {
        return await this._model.findById(id, projection).exec();
    }

    public async find(
        filter: FilterQuery<T>,
        projection?: string
    ): Promise<T[]> {
        return await this._model.find(filter, projection).exec();
    }

    public async all(projection?: string): Promise<T[]> {
        return await this._model.find({}, projection).exec();
    }

    public async delete(id: string): Promise<T> {
        return await this._model.findByIdAndRemove(id).exec();
    }

    // can't use the T type for doc due to TS bug
    public async upsert(id: string, doc?: unknown): Promise<T> {
        return await this._model
            .findByIdAndUpdate(id, doc as UpdateQuery<T>, {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true,
            })
            .exec();
    }
}

export { GenericMongoRepository };
