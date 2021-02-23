const mongoose = require("mongoose");

const GuildSchema = new mongoose.Schema({
    _id: String,
    prefix: { type: String, default: "." },
    language: { type: String, default: "ru-RU" },
    disabledCommands: [String]
});

module.exports = mongoose.model("Guild", GuildSchema);