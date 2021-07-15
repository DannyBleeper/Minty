import "reflect-metadata";
import "mocha";
import { expect } from "chai";
import { ParseUtils } from "../src/utils/parse/ParseUtils";

describe("ParseUtils tests", () => {
    it("should parse string with args", () => {
        const result = ParseUtils.parse(
            "{{prefix}} test {{prefix}} test {{mention}} test {{mention}}",
            { prefix: ".", mention: "a" }
        );

        expect(result).to.equal(". test . test a test a");
    });

    it("should parse string partially", () => {
        const result = ParseUtils.parse("{{pref}} {{prefix}} test", {
            prefix: ".",
        });

        expect(result).to.equal("{{pref}} . test");
    });

    it("should not modify string", () => {
        const result = ParseUtils.parse("test", {});

        expect(result).to.equal("test");
    });
});
