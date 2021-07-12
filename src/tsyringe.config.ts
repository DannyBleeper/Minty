import { container, registry } from "tsyringe";
import { Help } from "./commands/general/Help";
import { Ping } from "./commands/general/Ping";

export const DiscordToken = Symbol("DISCORD_TOKEN");
export const DbUriToken = Symbol("DB_URI");
export const CommandToken = Symbol("COMMAND");

export function registerCommands(): ClassDecorator {
    return (target) =>
        registry([
            { token: CommandToken, useToken: Help },
            { token: CommandToken, useToken: Ping },
        ])(target);
}

container.register(DiscordToken, { useValue: process.env.DISCORD_BOT_TOKEN });
container.register(DbUriToken, { useValue: process.env.MONGODB_URI });
