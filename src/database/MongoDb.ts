import * as mongoose from "mongoose";
import { singleton } from "tsyringe";

@singleton()
class MongoDb {
    constructor() {
        mongoose.set("useFindAndModify", false);
    }

    public async connect(uri: string): Promise<void | typeof mongoose> {
        try {
            return await mongoose.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
            });
        } catch (err) {
            console.log(err);
        }
    }

    public async disconnect(): Promise<void> {
        await mongoose.disconnect();
    }
}

export { MongoDb };
