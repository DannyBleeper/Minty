import { Command } from "../Command";
import { Client, Message } from "discord.js";
import { singleton } from "tsyringe";
import { CommandServiceProvider } from "../../providers/CommandServiceProvider";

@singleton()
class Ping extends Command {
    constructor() {
        super("ping", ["пинг"], ["SEND_MESSAGES"]);
    }

    public async run(
        serviceProvider: CommandServiceProvider,
        client: Client,
        msg: Message,
        args?: string[]
    ): Promise<void> {
        msg.channel.send(`:ping_pong: \`${Math.ceil(client.ws.ping)}ms\``);
    }
}

export { Ping };
