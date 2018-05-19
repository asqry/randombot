const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    //.clear 15
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Try again!");
    if(!args[0]) return message.channel.send("Usage: clear <# of messages>");
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`${message.author} cleared ${args[0]} messages.`).then(msg => msg.delete(5000));
    });
}

module.exports.help = {
    name: "clear"
}
