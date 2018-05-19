const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Cannot find user.");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("No can do pal!");
    if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That person cannot be banned.");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#a5039d")
    .addField("__Banned User__", `${bUser} with ID: ${bUser.id}`)
    .addField("__Banned By__", `${message.author.id} with ID: ${message.author.id}`)
    .addField("__Banned In__", message.channel)
    .addField("__Time__", message.createdAt)
    .addField("__Reason__", bReason);

    let banChannel = message.guild.channels.find(`name`, "punishments");
    if(!banChannel) return message.channel.send("Cannot find a punishments channel.");

    message.guild.member(bUser).ban(bReason);
    banChannel.send(banEmbed);
}

module.exports.help = {
    name: "ban"
}
