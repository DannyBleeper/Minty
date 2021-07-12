import { CommandService } from "../../services/CommandService";
import { Command } from "../Command";
import { Client, Message } from "discord.js";
import { GuildService } from "../../services/GuildService";
import { UserService } from "../../services/UserService";
import { EmbedService } from "../../services/EmbedService";
import { delay, inject, singleton } from "tsyringe";

@singleton()
class Ping extends Command {
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
            "ping",
            ["пинг"],
            ["SEND_MESSAGES"]
        );
    }

    public async run(
        client: Client,
        msg: Message,
        args?: string[]
    ): Promise<void> {
        msg.channel.send(`:ping_pong: \`${Math.ceil(client.ws.ping)}ms\``);
    }
}

export { Ping };
