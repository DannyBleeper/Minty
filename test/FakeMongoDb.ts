import { MongoMemoryServer } from "mongodb-memory-server";
import * as mongoose from "mongoose";

class FakeMongoDb {
    private readonly _db: MongoMemoryServer;

    constructor(db: MongoMemoryServer) {
        this._db = db;
    }

    public getUri(): string {
        return this._db.getUri();
    }

    public async connect(): Promise<void> {
        const uri = this._db.getUri();
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            poolSize: 10,
            useFindAndModify: false,
        };
        await mongoose.connect(uri, options);
    }

    public async close(): Promise<void> {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await this._db.stop();
    }

    public async clear(): Promise<void> {
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany({});
        }
    }
}

export { FakeMongoDb };
