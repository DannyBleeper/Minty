import "reflect-metadata";
import "mocha";
import { expect } from "chai";
import { instance, mock, when } from "ts-mockito";
import { Guild, Message, User } from "discord.js";
import { Guild as GuildInfo } from "../src/database/models/Guild";
import { LanguageService } from "../src/services/LanguageService";
import { GuildService } from "../src/services/GuildService";
import { ResponseService } from "../src/services/ResponseService";

describe("ResponseService tests", () => {
    let languageServiceMock: LanguageService;
    let languageService: LanguageService;

    let guildService: GuildService;
    let guildServiceMock: GuildService;

    let userMock: User;
    let user: User;

    let guildMock: Guild;
    let guild: Guild;

    let messageMock: Message;
    let message: Message;

    let guildInfo: GuildInfo;

    let responseService: ResponseService;

    beforeEach(() => {
        languageServiceMock = mock(LanguageService);
        languageService = instance(languageServiceMock);

        guildServiceMock = mock(GuildService);
        guildService = instance(guildServiceMock);

        userMock = mock(User);
        user = instance(userMock);
        user.id = "user";
        user.username = "user";

        guildMock = mock(Guild);
        guild = instance(guildMock);
        guild.id = "test";

        messageMock = mock(Message);
        message = instance(messageMock);
        message.content = "test";
        message.author = user;

        guildInfo = { _id: "test", prefix: ".", language: "ru" };

        responseService = new ResponseService(languageService, guildService);
    });

    it("should return correct response", async () => {
        when(languageServiceMock.getResponseInfoList("ru")).thenReturn([
            { regex: "test", responses: ["{{mention}} {{prefix}} response"] },
        ]);

        when(guildServiceMock.findById(guild.id)).thenResolve(guildInfo);

        when(messageMock.guild).thenReturn(guild);

        const response = await responseService.getResponse("ru", message);

        expect(response).to.equal("<@user> . response");
    });

    it("should not return response", async () => {
        when(languageServiceMock.getResponseInfoList("ru")).thenReturn([
            { regex: "cheese", responses: ["{{mention}} {{prefix}} response"] },
        ]);

        when(guildServiceMock.findById(guild.id)).thenResolve(guildInfo);

        when(messageMock.guild).thenReturn(guild);

        const response = await responseService.getResponse("ru", message);

        expect(response).to.equal(null);
    });
});
