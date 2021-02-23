const Command = require("../Command.js");

class Ping extends Command {
    constructor() {
        super({
            name: "ping",
            aliases: ["пинг"],
            botPermissions: ["SEND_MESSAGES"]
        });
    }

    run(client, msg) {
        msg.channel.send(`:ping_pong: \`${Math.ceil(client.ws.ping)}ms\``);
    }
}

module.exports = Ping;