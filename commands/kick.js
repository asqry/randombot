const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Cannot find user.");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You are not authorized to use this command")
    if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That person cannot be kicked.");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#a5039d")
    .addField("__Kicked User__", `${kUser} with ID: ${kUser.id}`)
    .addField("__Kicked By__", `${message.author.id} with ID: ${message.author.id}`)
    .addField("__Kicked In__", message.channel)
    .addField("__Time__", message.createdAt)
    .addField("__Reason__", kReason);

    let kickChannel = message.guild.channels.find(`name`, "punishments");
    if(!kickChannel) return message.channel.send("Cannot find a punishments channel.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
}

module.exports.help = {
    name: "kick"
}
