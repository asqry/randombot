const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return message.channel.send("Couldn't find user.");
        let reason = args.join(" ").slice(22);

        let reportembed = new Discord.RichEmbed()
        .setDescription("Reports")
        .setColor("#a5039d")
        .addField("__Reported User__", `${rUser} with ID: ${rUser.id}`)
        .addField("__Reported By__", `${message.author} with ID: ${message.author.id}`)
        .addField("__Channel__", message.channel)
        .addField("__Time__", message.createdAt)
        .addField("__Reason__", reason);

        let reportschannel = message.guild.channels.find(`name`, "reports");
        if(!reportschannel) return message.channel.send("Couldn't find reports channel.");

        message.delete().catch(O_o=>{});
        reportschannel.send(reportembed);
}

module.exports.help = {
    name: "report"
}
