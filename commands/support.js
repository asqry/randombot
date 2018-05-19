const Discord = require("discord.js");
const config = require("../botconfig.json");
let blue = config.blue;

module.exports.run = async (bot, message, args) => {
	let embed = new Discord.RichEmbed()
	.setColor(blue)
	.setTitle("Join the RandomBot Support Server")
	.setURL("https://discord.gg/EFKUyjN")

	message.delete().catch()

	message.channel.send(embed)
}

module.exports.help = {
	name: "support"
}