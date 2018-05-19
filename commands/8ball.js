const Discord = require("discord.js");
const config = require("../botconfig.json")
let green = config.green;

module.exports.run = async (bot, message, args) => {
    //.8ball <question fndsfnjsdkfjn>
    if(!args[1]) return message.channel.send("Please ask a question!");
    let replies = ["Yes.", "No.", "I don't know", "Not a chance.", "Ask again."];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(0).join(" ");

    let ballembed = new Discord.RichEmbed()
    .setTitle(":8ball: 8ball :8ball:")
    .setAuthor(message.author.tag)
    .setColor(green)
    .addField("Question", question)
    .addField("Answer", replies[result]);

    message.channel.send(ballembed)
}

module.exports.help = {
    name: "8ball"
}
