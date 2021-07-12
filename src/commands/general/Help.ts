import { Command } from "../Command";
import { EmbedService } from "../../services/EmbedService";
import { CommandService } from "../../services/CommandService";
import { Client, Message, MessageEmbed } from "discord.js";
import { GuildService } from "../../services/GuildService";
import { UserService } from "../../services/UserService";
import { delay, inject, singleton } from "tsyringe";

@singleton()
class Help extends Command {
    constructor(
        @inject(delay(() => CommandService)) commandService: CommandService,
        guildService: GuildService,
        userService: UserService,
        embedService: EmbedService
    ) {
        super(
            commandService,
            guildService,
            userService,
            embedService,
            "help",
            ["h", "помощь", "помоги"],
            ["SEND_MESSAGES"]
        );
    }

    public async run(
        client: Client,
        msg: Message,
        args?: string[]
    ): Promise<void> {
        const guildInfo = await this._guildService.findById(msg.guild.id);

        let embed: MessageEmbed;

        if (!args || args.length === 0) {
            embed = this._embedService.getCommandsListEmbed(
                this._commandService.commands,
                guildInfo.prefix,
                guildInfo.language
            );
        } else {
            const cmdName = args[0];
            if (cmdName) {
                const cmd = this._commandService.find(cmdName);
                embed = this._embedService.getCommandInfoEmbed(
                    cmd,
                    guildInfo.prefix,
                    guildInfo.language
                );
            }
        }

        if (embed) {
            msg.channel.send(embed);
        } else {
            msg.channel.send("Embed was empty.");
        }
    }
}

export { Help };
