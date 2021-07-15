import { MessageEmbed } from "discord.js";
import { ParseUtils } from "./../utils/ParseUtils";
import { GroupUtils } from "./../utils/GroupUtils";
import { StringUtils } from "./../utils/StringUtils";
import { Command } from "../commands/Command";
import { LanguageService } from "./LanguageService";
import { singleton } from "tsyringe";
import { CommandService } from "./CommandService";

enum Color {
    Info = "GREEN",
    Error = "RED",
    Warn = "YELLOW",
}

@singleton()
class EmbedService {
    private readonly _languageService: LanguageService;
    private readonly _commandService: CommandService;

    constructor(
        languageService: LanguageService,
        commandService: CommandService
    ) {
        this._languageService = languageService;
        this._commandService = commandService;
    }

    public getCommandInfoEmbed(
        cmd: Command,
        prefix: string,
        language: string
    ): MessageEmbed {
        if (!cmd) return null;

        const cmdInfo = this._commandService.findInfo(cmd.name, language);

        if (!cmdInfo) return null;

        const cmdDescription = cmdInfo.description;
        const cmdUsages = cmdInfo.usages.map((u) =>
            ParseUtils.parse(u, { prefix })
        );

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
        if (!commands || commands.length == 0) return null;

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
