const Discord = require("discord.js");
const config = require("../botconfig.json");
let blue = config.blue;
let green = config.green;
let prefix = config.prefix;

module.exports.run = async (bot, message, args) => {
	let embed = new Discord.RichEmbed()
	.setDescription("Moderation Commands")
	.setColor(blue)
	.setThumbnail(bot.user.avatarURL)
	.addField(`${prefix}kick`, `Usage: ${prefix}kick <@user> <reason> - Kicks a specified user from the guild - Requires "Kick Members" permission`)
	.addField(`${prefix}ban`, `Usage: ${prefix}ban <@user> <reason> - Bans a specified user from the guild - Requires "Ban Members" permission`)
	.addField(`${prefix}warn`, `Usage: ${prefix}warn <@user> <reason> - Gives a specified user a warning - Requires "Manage Messages" permission`)
	.addField(`${prefix}addrole`, `Usage: ${prefix}addrole <@user> <caseSensitiveRoleName> - Adds the specified role to a specified user - Requires "Manage Roles" permission`)
	.addField(`${prefix}removerole`, `Usage: ${prefix}removerole <@user> <caseSensitiveRoleName> - Removes the specified role to a specified user - Requires "Manage Roles" permission`)
	.addField(`${prefix}warns`, `Usage ${prefix}warns <@user> - Gives the specified user's amount of warns - Requires "Manage Messages" permission`)
	.addField(`${prefix}clear`, `Usage: ${prefix}clear <# of messages max 100> - Clears the specified amount of messages - Requires "Manage Messages" permission`)
	.addField(`${prefix}say`, `Usage: ${prefix}say <message> - Deletes original message and restates through bot - Requires "Manage Messages" permission`)
	.addField(`${prefix}tempmute`, `Usage: ${prefix}tempmute <@user> <amount of time s/m/d> - Mutes the specified user for the specified amount of time - Requires "Kick Members" permission`)
	.addField(`${prefix}unmute`, `Usage: ${prefix}unmute <@user> - Unmutes specified user - Requires "Kick Members" permission`)	

	// Stuff?

	let approved = new Discord.RichEmbed()
	.setDescription(":white_check_mark: DM Successfully Sent!")
	.setColor(green)

	message.delete().catch()

	message.member.send(embed)
	message.channel.send(approved).then(msg => {msg.delete(5000)})
}

module.exports.help = {
	name: "modhelp"
}