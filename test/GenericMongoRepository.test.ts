import "reflect-metadata";
import "mocha";
import { expect } from "chai";
import { GenericMongoRepository } from "../src/database/repositories/GenericMongoRepository";
import { model, Schema } from "mongoose";
import { FakeMongoDb } from "./FakeMongoDb";
import { MongoMemoryServer } from "mongodb-memory-server";

interface Test {
    name?: string;
}

const testModel = model<Test>(
    "Test",
    new Schema({
        name: String,
    })
);

class TestRepository extends GenericMongoRepository<Test> {
    constructor() {
        super(testModel);
    }
}

describe("GenericMongoRepository tests", () => {
    const doc1: Test = { name: "bob" };
    const doc2: Test = { name: "rob" };
    const doc3: Test = { name: "bob" };

    let fakeDb: FakeMongoDb;
    let repository: GenericMongoRepository<Test>;

    before(async () => {
        fakeDb = new FakeMongoDb(await MongoMemoryServer.create());
        await fakeDb.connect();

        repository = new TestRepository();
    });

    afterEach(async () => {
        await fakeDb.clear();
    });

    after(async () => {
        await fakeDb.close();
    });

    it("should find document", async () => {
        await repository.insert(doc1);
        const result = await repository.findOne({ name: doc1.name });

        expect(result.name).to.equal(doc1.name);
    });

    it("should find documents", async () => {
        await repository.insertMany([doc1, doc2, doc3]);

        const result = await repository.find({ name: doc1.name });

        expect(result).with.length(2);
        expect(result[0].name).to.equal(doc1.name);
        expect(result[1].name).to.equal(doc3.name);
    });

    it("should find all documents", async () => {
        await repository.insertMany([doc1, doc2, doc3]);

        const result = await repository.all();

        expect(result).with.length(3);
        expect(result[0].name).to.equal(doc1.name);
        expect(result[1].name).to.equal(doc2.name);
        expect(result[2].name).to.equal(doc3.name);
    });

    it("should insert document", async () => {
        const result = await repository.insert(doc1);

        expect(result.name).to.equal(doc1.name);
    });

    it("should insert documents", async () => {
        const result = await repository.insertMany([doc1, doc2, doc3]);

        expect(result).with.length(3);
        expect(result[0].name).to.equal(doc1.name);
        expect(result[1].name).to.equal(doc2.name);
        expect(result[2].name).to.equal(doc3.name);
    });

    it("should delete document", async () => {
        await repository.insert(doc1);

        const result = await repository.delete({ name: doc1.name });

        expect(result.name).to.equal(doc1.name);
    });

    it("should delete documents", async () => {
        await repository.insertMany([doc1, doc2, doc3]);

        const result = await repository.deleteMany({ name: doc1.name });

        expect(result).to.equal(2);
    });

    it("should update document if it exists", async () => {
        await repository.insert(doc1);

        const result = await repository.upsert(
            { name: doc1.name },
            {
                name: "rob",
            }
        );

        expect(result.name).to.equal("rob");
    });

    it("should insert document if it doesn't exists", async () => {
        await repository.insert(doc1);

        const result = await repository.upsert(
            { name: doc2.name },
            {
                name: doc2.name,
            }
        );

        expect(result.name).to.equal(doc2.name);
    });
});
