import { MessageEmbed } from "discord.js";
import { ParseUtils } from "./../utils/ParseUtils";
import { GroupUtils } from "./../utils/GroupUtils";
import { StringUtils } from "./../utils/StringUtils";
import { Command } from "../commands/Command";
import { LanguageService } from "./LanguageService";
import { singleton } from "tsyringe";

enum Color {
    Info = "GREEN",
    Error = "RED",
    Warn = "YELLOW",
}

@singleton()
class EmbedService {
    private readonly _languageService: LanguageService;

    constructor(languageService: LanguageService) {
        this._languageService = languageService;
    }

    public getCommandInfoEmbed(
        cmd: Command,
        prefix: string,
        language: string
    ): MessageEmbed {
        const cmdDescription = cmd.getDescription(language);
        const cmdUsages = cmd
            .getUsages(language)
            .map((u) => ParseUtils.parse(u, { prefix }));

        return new MessageEmbed()
            .setColor(Color.Info)
            .setTitle(cmd.name)
            .setDescription(cmdDescription)
            .addFields(
                {
                    name: this._languageService.findMiscText(language, "usage"),
                    value: cmdUsages.map((u) => `\`${u}\``).join("\n"),
                    inline: true,
                },
                {
                    name: this._languageService.findMiscText(
                        language,
                        "aliases"
                    ),
                    value: `\`${cmd.aliases.join(", ")}\``,
                    inline: true,
                }
            );
    }

    public getCommandsListEmbed(
        commands: Command[],
        prefix: string,
        language: string
    ): MessageEmbed {
        const groupedCmds = GroupUtils.groupBy(commands, (cmd) => cmd.category);

        const embed = new MessageEmbed()
            .setColor(Color.Info)
            .addFields(
                Object.keys(groupedCmds).map((groupName) => ({
                    name: `${StringUtils.capitalizeFirstLetter(groupName)}`,
                    value: `\`${groupedCmds[groupName]
                        .map((cmd) => cmd.name)
                        .join(", ")}\``,
                }))
            )
            .addField(
                "‎‎‏‏‎ ‎",
                ParseUtils.parse(
                    this._languageService.findMiscText(language, "help_hint"),
                    { prefix }
                )
            );
        return embed;
    }
}

export { EmbedService };
