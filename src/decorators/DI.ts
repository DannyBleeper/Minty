import { registry } from "tsyringe";
import { Help } from "../commands/general/Help";
import { Ping } from "../commands/general/Ping";
import { CommandToken } from "../tsyringe.config";

export function registerCommands(): ClassDecorator {
    return (target) =>
        registry([
            { token: CommandToken, useToken: Help },
            { token: CommandToken, useToken: Ping },
        ])(target);
}
