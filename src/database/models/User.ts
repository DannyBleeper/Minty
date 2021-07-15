import { Schema, model } from "mongoose";
import { BaseDiscordModel } from "./BaseDiscordModel";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface User extends BaseDiscordModel {}

export const UserModel = model<User>(
    "User",
    new Schema({
        discordId: { type: String, required: true, unique: true },
    })
);
