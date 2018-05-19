const Discord = require("discord.js");
const urban = require("relevant-urban");
const config = require("../botconfig.json");
let prefix = config.prefix;

module.exports.run = async (bot, message, args) => {
    if(!args[0]) return message.channel.send(`**Usage:** ${prefix}urban <term>`);
    let res = await urban(args.join(" ")).catch(e => {
        return message.channel.send(`Sorry, that word was not found.`);
    });

    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle(res.word)
    .setThumbnail("https://is4-ssl.mzstatic.com/image/thumb/Purple111/v4/7e/49/85/7e498571-a905-d7dc-26c5-33dcc0dc04a8/source/1200x630bb.jpg")
    .setURL(res.urbanURL)
    .addField(`Definition`, `${res.definition}`)
    .addField(`Example`, `${res.example}`);

    message.channel.send(embed);

}

module.exports.help = {
    name: "urban"
}
