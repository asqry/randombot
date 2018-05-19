const Discord = require("discord.js");
const config = require("../botconfig.json");
let blue = config.blue;

module.exports.run = async (bot, message, args) => {
	let embed = new Discord.RichEmbed()
	.setDescription(`Server Information for ${message.guild.name}`)
	.setColor(blue)
    .setThumbnail(bot.user.avatarURL)
    .addField("__Server Name__", message.guild.name)
    .addField("__Created On__", message.guild.createdAt)
    .addField("__You Joined__", message.member.joinedAt)
    .addField("__Total Members__", message.guild.memberCount);

	message.delete().catch()

	message.channel.send(embed)
}

module.exports.help = {
	name: "server"
}
