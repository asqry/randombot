const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let result = Math.floor(Math.random() * 100) +0;

    let ricon = message.author.displayAvatarURL
    let rembed = new Discord.RichEmbed()
    .setTitle("Random Number Generator")
    .setColor("RANDOM")
    .setThumbnail("https://cdn.discordapp.com/attachments/435540947615350785/436986239418368010/random.png", true)
    .addField("Your Number", `${result}`, true)
    .setFooter("RNG", ricon);

    message.channel.send(rembed)
}

module.exports.help = {
    name: "rng"
}
