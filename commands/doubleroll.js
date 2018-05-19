const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	let number1 = Math.floor(Math.random(1) * 6)
	let number2 = Math.floor(Math.random(1) * 6)

	message.channel.send(`Your two numbers are ${number1} and ${number2}!`)
}

module.exports.help = {
	name: "doubleroll"
}