import "reflect-metadata";
import "mocha";
import { expect } from "chai";
import { instance, mock, verify, when } from "ts-mockito";
import { Command } from "../src/commands/Command";
import { CommandService } from "../src/services/CommandService";
import { LanguageService } from "../src/services/LanguageService";
import { CommandInfo } from "../src/language models/CommandInfo";

describe("CommandService tests", () => {
    let commandMock: Command;
    let command: Command;

    const commandInfoList: CommandInfo[] = [
        { name: "help", description: "test", usages: ["test"] },
    ];

    let languageServiceMock: LanguageService;
    let languageService: LanguageService;

    let commandService: CommandService;

    beforeEach(() => {
        commandMock = mock(Command);
        command = instance(commandMock);
        when(commandMock.name).thenReturn("help");
        when(commandMock.aliases).thenReturn(["h"]);

        languageServiceMock = mock(LanguageService);
        languageService = instance(languageServiceMock);
        when(languageServiceMock.getCommandInfoList("ru")).thenReturn(
            commandInfoList
        );

        commandService = new CommandService(
            null,
            null,
            [command],
            languageService
        );
    });

    it("should find command by name", () => {
        const foundCommand = commandService.find("help");

        expect(foundCommand).to.equal(command);
    });

    it("should find command by alias", () => {
        const foundCommand = commandService.find("h");

        expect(foundCommand).to.equal(command);
    });

    it("should not find command", () => {
        const foundCommand = commandService.find("a");

        expect(foundCommand).to.be.undefined;
    });

    it("should find command info by name and language", () => {
        const foundInfo = commandService.findInfo("help", "ru");

        verify(languageServiceMock.getCommandInfoList("ru")).once();
        expect(foundInfo).to.equal(commandInfoList[0]);
    });

    it("should not find command info", () => {
        const foundInfo = commandService.findInfo("a", "ru");

        verify(languageServiceMock.getCommandInfoList("ru")).once();
        expect(foundInfo).to.be.undefined;
    });
});
