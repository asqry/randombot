const Discord = require("discord.js");
const config = require("../botconfig.json");
let prefix = config.prefix;
let blue = config.blue;

module.exports.run = async (bot, message, args) => {
	let embed = new Discord.RichEmbed()
	.setDescription(`Information about ${bot.user.username}`)
	.setColor(blue)
	.setThumbnail(bot.user.avatarURL)
	.addField("Bot Username", bot.user.username)
	.addField("Bot Created", bot.user.createdAt)
	.addField("Created By", "Bot created by **seekeroftacos#8722**")
	.addField("Support Discord", "https://discord.gg/5YdQEQe")

	.setFooter("RandomBot", bot.user.avatarURL)

	message.delete().catch()

	message.channel.send(embed)
}

module.exports.help = {
	name: "botinfo"
}