import { container } from "tsyringe";
import { Help } from "./commands/general/Help";
import { Ping } from "./commands/general/Ping";
import { GuildRepository } from "./database/repositories/GuildRepository";
import { UserRepository } from "./database/repositories/UserRepository";
import { GuildService } from "./services/GuildService";
import { UserService } from "./services/UserService";

export const DiscordToken = Symbol("DISCORD_TOKEN");
export const DbUriToken = Symbol("DB_URI");
export const CommandToken = Symbol("Command");
export const GuildRepositoryToken = Symbol("GuildRepository");
export const UserRepositoryToken = Symbol("UserRepository");
export const GuildServiceToken = Symbol("GuildService");
export const UserServiceToken = Symbol("UserService");

container.register(DiscordToken, { useValue: process.env.DISCORD_BOT_TOKEN });
container.register(DbUriToken, { useValue: process.env.MONGODB_URI });

container.register(GuildRepositoryToken, { useClass: GuildRepository });
container.register(UserRepositoryToken, { useClass: UserRepository });

container.register(GuildServiceToken, { useClass: GuildService });
container.register(UserServiceToken, { useClass: UserService });

container.register(CommandToken, { useToken: Help });
container.register(CommandToken, { useToken: Ping });
