import { Message } from "discord.js";
import { RegexUtils } from "./../utils/RegexUtils";
import { RandomUtils } from "./../utils/RandomUtils";
import { ParseUtils } from "./../utils/ParseUtils";
import { LanguageService } from "./LanguageService";
import { inject, singleton } from "tsyringe";
import { BaseDiscordRepositoryService } from "./BaseDiscordRepositoryService";
import { Guild } from "../database/models/Guild";
import { GuildServiceToken } from "../tsyringe.config";

@singleton()
class ResponseService {
    private readonly _languageService: LanguageService;
    private readonly _guildService: BaseDiscordRepositoryService<Guild>;

    constructor(
        languageService: LanguageService,
        @inject(GuildServiceToken)
        guildService: BaseDiscordRepositoryService<Guild>
    ) {
        this._languageService = languageService;
        this._guildService = guildService;
    }

    public async getResponse(language: string, msg: Message): Promise<string> {
        const responseInfoList =
            this._languageService.getResponseInfoList(language);

        const unparsedResponse = responseInfoList.find((r) => {
            return RegexUtils.strToRegex(r.regex)?.test(msg.content);
        });

        if (!unparsedResponse) return null;

        const guildInfo = await this._guildService.findById(msg.guild.id);

        return ParseUtils.parse(
            RandomUtils.getRandomElement(unparsedResponse.responses),
            {
                mention: `<@${msg.author.id}>`,
                prefix: guildInfo.prefix,
            }
        );
    }
}

export { ResponseService };
