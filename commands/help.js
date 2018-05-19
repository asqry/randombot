const Discord = require("discord.js");
const config = require("../botconfig.json");
let prefix = config.prefix;
let blue = config.blue;

module.exports.run = async (bot, message, args) => {
	let embed = new Discord.RichEmbed()
	.setDescription("~Help~")
	.setThumbnail(bot.user.avatarURL)
	.setColor(blue)
	.addField(`${prefix}help`, "Displays this message")
	.addField(`${prefix}modhelp`, "Displays moderation commands in a private message")
	.addField(`${prefix}hdm`, "Displays this message in a private message")
	.addField(`${prefix}botinfo`, "Displays information about RandomBot")
	.addField(`${prefix}server`, "Displays information about the guild you are currently in")
	.addField(`${prefix}invite`, "Provides a link to invite the bot to your server")
	.addField(`${prefix}support`, "Provides a link to the support discord")
	.addField(`${prefix}8ball`, `Usage: ${prefix}8ball <question> - Answers your question with a random response`)
	.addField(`${prefix}dog`, "Displays a random photo or gif of a dog")
	.addField(`${prefix}urban`, `Usage: ${prefix}urban <term> - Gives urban dictionary definition of a given term`)
	.addField(`${prefix}pun`, "Displays a random pun")
	.addField(`${prefix}rng`, "Outputs a random number from 1-100")
	.addField(`${prefix}roll`, "Outputs a random number from 1-6")
	.addField(`${prefix}fortune`, "Outputs a random fortune")
	.addField(`${prefix}report`, `Usage: ${prefix}report <@user> <reason> - Sends a report against a specified user`)
	.setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL)

	message.delete().catch()

	message.channel.send(embed)
}

module.exports.help = {
	name: "help"
}