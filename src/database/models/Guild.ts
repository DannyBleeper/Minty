import { Schema, model } from "mongoose";
import { BaseDiscordModel } from "./BaseDiscordModel";

export interface Guild extends BaseDiscordModel {
    prefix?: string;
    language?: string;
    disabledCommands?: string[];
}
export const GuildModel = model<Guild>(
    "Guild",
    new Schema({
        discordId: { type: String, required: true, unique: true },
        prefix: { type: String, default: "." },
        language: { type: String, default: "ru-RU" },
        disabledCommands: [String],
    })
);
