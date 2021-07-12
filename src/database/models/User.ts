import { Schema, model } from "mongoose";
import { BaseModel } from "./BaseModel";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface User extends BaseModel {}

export const UserModel = model<User>(
    "User",
    new Schema({
        _id: String,
    })
);
