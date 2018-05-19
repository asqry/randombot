const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let replies = ["Did you hear about the auto body shop that just opened? It comes highly wreck-a-mended.", "All these sea monster jokes are just Kraken me up.", "Jokes about unemployed people are not funny. They just don’t work.", "Apparently taking a day off is not something you should do when you work for a calendar company.", "Have you ever tried to eat a clock? It’s very time consuming.", "Did you hear about the computer technician who received third degree burns? He touched the firewall.", "My ex-wife still misses me. But her aim is steadily improving."]

    let result = Math.floor((Math.random() * replies.length));
    message.channel.send(replies[result]);
}

module.exports.help = {
    name: "pun"
}
