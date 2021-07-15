import "reflect-metadata";
import "mocha";
import { expect } from "chai";
import { LanguageService } from "../src/services/LanguageService";
import { CommandService } from "../src/services/CommandService";
import { EmbedService } from "../src/services/EmbedService";
import { instance, mock, when } from "ts-mockito";
import { Command } from "../src/commands/Command";
import { CommandInfo } from "../src/language models/CommandInfo";

describe("EmbedService tests", () => {
    let languageServiceMock: LanguageService;
    let languageService: LanguageService;

    let commandServiceMock: CommandService;
    let commandService: CommandService;

    let commandMock: Command;
    let command: Command;

    const commandInfo: CommandInfo = {
        name: "help",
        description: "test",
        usages: [""],
    };

    let embedService: EmbedService;

    beforeEach(() => {
        languageServiceMock = mock(LanguageService);
        languageService = instance(languageServiceMock);

        commandServiceMock = mock(CommandService);
        commandService = instance(commandServiceMock);

        commandMock = mock(Command);
        command = instance(commandMock);
        when(commandMock.name).thenReturn("help");
        when(commandMock.aliases).thenReturn(["h"]);

        embedService = new EmbedService(languageService, commandService);
    });

    it("should return command info embed", () => {
        when(commandServiceMock.findInfo("help", "ru")).thenReturn(commandInfo);

        const embed = embedService.getCommandInfoEmbed(command, ".", "ru");

        expect(embed).to.not.be.null;
    });

    it("should return null", () => {
        when(commandServiceMock.findInfo("help", "ru")).thenReturn(null);

        const embed = embedService.getCommandInfoEmbed(command, ".", "ru");

        expect(embed).to.be.null;
    });

    it("should return command info list embed", () => {
        const embed = embedService.getCommandsListEmbed([command], ".", "ru");

        expect(embed).to.not.be.null;
    });

    it("should return null", () => {
        const embed = embedService.getCommandsListEmbed([], ".", "ru");

        expect(embed).to.be.null;
    });
});
