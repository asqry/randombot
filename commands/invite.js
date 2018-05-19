const Discord = require("discord.js");
const config = require("../botconfig.json");
let blue = config.blue;

module.exports.run = async (bot, message, args) => {
	let embed = new Discord.RichEmbed()
	.setTitle(`Invite ${bot.user.username} to your server`)
	.setColor(blue)
	.setURL("https://discordapp.com/oauth2/authorize?client_id=445266140965634058&scope=bot&permissions=8")

	message.delete().catch()

	message.channel.send(embed)
}

module.exports.help = {
	name: "invite"
}