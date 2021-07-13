import { BaseModel } from "../database/models/BaseModel";
import { MongoRepository } from "../database/repositories/GenericMongoRepository";

abstract class BaseRepositoryService<T extends BaseModel> {
    protected readonly _repository: MongoRepository<T>;

    constructor(repository: MongoRepository<T>) {
        this._repository = repository;
    }

    public async insert(id: string): Promise<T> {
        return await this._repository.insert({ _id: id } as T);
    }

    public async findById(id: string): Promise<T> {
        return await this._repository.findOne(id);
    }

    public async all(): Promise<T[]> {
        return await this._repository.all();
    }

    public async delete(id: string): Promise<T> {
        return await this._repository.delete(id);
    }

    public async upsert(id: string, doc?: T): Promise<T> {
        return await this._repository.upsert(id, doc);
    }

    public async save(ids: string[]): Promise<void> {
        ids.forEach(async (id) => await this.insert(id));
    }
}

export { BaseRepositoryService };
