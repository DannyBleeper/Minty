import { BaseDiscordModel } from "../database/models/BaseDiscordModel";
import { GenericMongoRepository } from "../database/repositories/GenericMongoRepository";

abstract class BaseDiscordRepositoryService<T extends BaseDiscordModel> {
    protected readonly _repository: GenericMongoRepository<T>;

    constructor(repository: GenericMongoRepository<T>) {
        this._repository = repository;
    }

    public async insert(discordId: string): Promise<T> {
        return await this._repository.insert({ discordId } as T);
    }

    public async findById(discordId: string): Promise<T> {
        return await this._repository.findOne({ discordId } as T);
    }

    public async all(): Promise<T[]> {
        return await this._repository.all();
    }

    public async delete(discordId: string): Promise<T> {
        return await this._repository.delete({ discordId } as T);
    }

    public async upsert(discordId: string, doc?: T): Promise<T> {
        return await this._repository.upsert({ discordId } as T, doc);
    }

    public async save(discordIds: string[]): Promise<void> {
        await this._repository.insertMany(
            discordIds.map((discordId) => ({ discordId } as T))
        );
    }
}

export { BaseDiscordRepositoryService };
