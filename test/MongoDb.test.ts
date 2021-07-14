import "reflect-metadata";
import "mocha";
import { expect } from "chai";
import { MongoDb } from "../src/database/MongoDb";
import * as mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { restore, SinonSpiedInstance, spy } from "sinon";

describe("MongoDb tests", () => {
    let mongoDb: MongoDb;
    let mongoServer: MongoMemoryServer;
    let uri: string;
    let spiedMongoose: SinonSpiedInstance<mongoose.Mongoose>;

    before(async () => {
        mongoServer = await MongoMemoryServer.create();
        uri = mongoServer.getUri();
        mongoDb = new MongoDb();
        spiedMongoose = spy(mongoose);
    });

    after(() => {
        restore();
    });

    it("should connect once", async () => {
        await mongoDb.connect(uri);

        expect(spiedMongoose.connect.calledOnce).to.be.true;
        expect(spiedMongoose.connect.firstCall.args[0]).to.equal(uri);
    });

    it("should disconnect once", async () => {
        await mongoDb.disconnect();

        expect(spiedMongoose.disconnect.calledOnce).to.be.true;
    });
});
