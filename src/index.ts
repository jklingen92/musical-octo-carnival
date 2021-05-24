import * as Discord from "discord.js";
import { commands } from "./commands";
const Sequelize = require("sequelize");

const auth = require("../auth.json");

// Initialize Discord Bot
const client: Discord.Client = new Discord.Client({})

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const Nominations = sequelize.define('nominations', {
	name: {
        type: Sequelize.STRING,
        unique: true
    },
	username: Sequelize.STRING
});

client.once("ready", () => {
    Nominations.sync({})
})

client.on("message", async (message) => {
    if (message.author.bot) return;
    const re = /^\/(\w+) ?(.*)$/;
    const match = message.content.match(re);
    if (!match) return
    const command = match[1]
    const body = match[2]
    const config = {
        botId: client
    }

    const desiredCommand = Object.keys(commands).find((key) => {
        return commands[key].triggers.includes(command)
    })

    if (desiredCommand) {
        commands[desiredCommand].callback(message, body, Nominations)
    }

});

client.login(auth.BOT_TOKEN)