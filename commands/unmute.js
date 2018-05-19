const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let muteduser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!muteduser) return message.channel.send("Please specify a muted user to unmute.");
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You cannot unmute that user.");
    if(muteduser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That user couldn't have been muted.");

    let umrole = message.guild.roles.find(`name`, "muted");

    muteduser.removeRole(umrole);
    message.channel.send(`<@${muteduser.id}> has been unmuted by ${message.author}.`);
}

module.exports.help = {
    name: "unmute"
}
