import { Command } from "../Command";
import { Client, Message, MessageEmbed } from "discord.js";
import { singleton } from "tsyringe";
import { CommandServiceProvider } from "../../providers/CommandServiceProvider";

@singleton()
class Help extends Command {
    constructor() {
        super("help", ["h", "помощь", "помоги"], ["SEND_MESSAGES"]);
    }

    public async run(
        serviceProvider: CommandServiceProvider,
        client: Client,
        msg: Message,
        args?: string[]
    ): Promise<void> {
        const guildInfo = await serviceProvider.guildService.findById(
            msg.guild.id
        );

        let embed: MessageEmbed;

        if (!args || args.length === 0) {
            embed = serviceProvider.embedService.getCommandsListEmbed(
                serviceProvider.commandService.commands,
                guildInfo.prefix,
                guildInfo.language
            );
        } else {
            const cmdName = args[0];
            if (cmdName) {
                const cmd = serviceProvider.commandService.find(cmdName);
                embed = serviceProvider.embedService.getCommandInfoEmbed(
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
