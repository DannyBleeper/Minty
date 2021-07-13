import { Client, Message } from "discord.js";
import { CommandService } from "./services/CommandService";
import { MongoDb } from "./database/MongoDb";
import { ResponseService } from "./services/ResponseService";
import {
    DiscordToken,
    DbUriToken,
    GuildServiceToken,
    UserServiceToken,
} from "./tsyringe.config";
import { inject, singleton } from "tsyringe";
import { BaseRepositoryService } from "./services/BaseRepositoryService";
import { Guild } from "./database/models/Guild";
import { User } from "./database/models/User";

@singleton()
class Minty {
    private readonly _token: string;
    private readonly _mongoDbUri: string;
    private readonly _client: Client;
    private readonly _mongoDb: MongoDb;
    private readonly _commandService: CommandService;
    private readonly _responseService: ResponseService;
    private readonly _guildService: BaseRepositoryService<Guild>;
    private readonly _userService: BaseRepositoryService<User>;

    constructor(
        @inject(DiscordToken) token: string,
        @inject(DbUriToken) mongoDbUri: string,
        @inject(GuildServiceToken) guildService: BaseRepositoryService<Guild>,
        @inject(UserServiceToken) userService: BaseRepositoryService<User>,
        client: Client,
        mongoDb: MongoDb,
        commandService: CommandService,
        responseService: ResponseService
    ) {
        this._token = token;
        this._mongoDbUri = mongoDbUri;
        this._client = client;
        this._mongoDb = mongoDb;
        this._commandService = commandService;
        this._guildService = guildService;
        this._userService = userService;
        this._responseService = responseService;
    }

    public async start(): Promise<void> {
        this._client.login(this._token);

        this._client.on("ready", async () => {
            console.log(`${this._client.user.username} is running.`);

            await this._mongoDb.connect(this._mongoDbUri);

            await this._guildService.save(
                this._client.guilds.cache.map((g) => g.id)
            );
        });

        this._client.on("guildCreate", async (guild) => {
            await this._guildService.insert(guild.id);
            await this._userService.save(guild.members.cache.map((m) => m.id));
        });

        this._client.on("message", async (msg) => {
            if (msg.author.bot) return;

            const guildInfo = await this._guildService.findById(msg.guild.id);

            if (msg.content.startsWith(guildInfo.prefix)) {
                const [cmdName, ...args] = msg.content
                    .trim()
                    .substring(guildInfo.prefix.length)
                    .split(/\s+/);

                const cmd = this._commandService.find(cmdName);

                if (!cmd) return;

                await cmd.run(this._client, msg, args);
            } else if (this.msgMentionsBot(msg)) {
                const response = await this._responseService.getResponse(
                    guildInfo.language,
                    msg
                );
                if (response) msg.channel.send(response);
            }
        });
    }

    private msgMentionsBot(msg: Message): boolean {
        return (
            msg.mentions.members.some(
                (member) => member.id === this._client.user.id
            ) ||
            msg.mentions.roles.some((role) =>
                msg.guild.member(this._client.user).roles.cache.has(role.id)
            )
        );
    }
}

export { Minty };
