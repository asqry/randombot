const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	let number = Math.floor(Math.random(1) * 6)

	message.channel.send(`:game_die: You rolled a ${number}!`)
}

module.exports.help = {
	name: "roll"
}