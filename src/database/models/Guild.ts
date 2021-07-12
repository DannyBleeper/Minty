import { Schema, model } from "mongoose";
import { BaseModel } from "./BaseModel";

export interface Guild extends BaseModel {
    prefix?: string;
    language?: string;
    disabledCommands?: string[];
}
export const GuildModel = model<Guild>(
    "Guild",
    new Schema({
        _id: String,
        prefix: { type: String, default: "." },
        language: { type: String, default: "ru-RU" },
        disabledCommands: [String],
    })
);
