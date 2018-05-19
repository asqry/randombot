const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    //.say Hi!
    //Hi
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Try again.");
    let botmessage = args.join(" ");
    if(!botmessage) return message.channel.send("Please provide what you want the bot to say.").then(msg => {
        msg.delete(3000)
    });
    message.delete().catch();
    message.channel.send(botmessage);
}

module.exports.help = {
    name: "say"
}
