import { Message } from "discord.js";
import { RegexUtils } from "./../utils/RegexUtils";
import { RandomUtils } from "./../utils/RandomUtils";
import { ParseUtils } from "./../utils/ParseUtils";
import { LanguageService } from "./LanguageService";
import { GuildService } from "./GuildService";
import { singleton } from "tsyringe";

@singleton()
class ResponseService {
    private readonly _languageService: LanguageService;
    private readonly _guildService: GuildService;

    constructor(languageService: LanguageService, guildService: GuildService) {
        this._languageService = languageService;
        this._guildService = guildService;
    }

    public async getResponse(language: string, msg: Message): Promise<string> {
        const responseInfoList =
            this._languageService.getResponseInfoList(language);
        const regex = Object.keys(responseInfoList).find((r) =>
            RegexUtils.strToRegex(r)?.test(msg.content)
        );

        if (!regex) return null;

        const guildInfo = await this._guildService.findById(msg.guild.id);

        return ParseUtils.parse(
            RandomUtils.getRandomElement(responseInfoList[regex]),
            {
                mention: msg.author.toString(),
                prefix: guildInfo.prefix,
            }
        );
    }
}

export { ResponseService };
