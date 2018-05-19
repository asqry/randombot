const botconfig = require('./botconfig.json');
const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

function loadCmds() {
    fs.readdir("./commands/", (err, files) => {

        if(err) console.log(err);

        let jsfile = files.filter(f => f.split(".").pop() === "js")
        if(jsfile.length <= 0){
            console.log("Couldn't find commands.");
            return;
        }

        jsfile.forEach((f, i) =>{
            delete require.cache[require.resolve(`./commands/${f}`)];
            let props = require(`./commands/${f}`);
            console.log(`${f} loaded!`);
            bot.commands.set(props.help.name, props);
        });

    });

}
function loadBot() {
    bot.on("ready", async () => {
        console.log(`${bot.user.username} is online!`);
        bot.user.setActivity("Da Bot", {type: "Playing"});
    });
}

loadBot();

loadCmds();

bot.on("message", async message => {
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandFile = bot.commands.get(cmd.slice(prefix.length));
    if(commandFile) commandFile.run(bot, message, args);

    if(cmd === `${prefix}reload`){
        message.delete().catch();
        let embed = new Discord.RichEmbed()
        .setDescription("All Commands Have Successfully Reloaded");
        message.channel.send(embed).then(msg => {msg.delete(5000)});
        loadCmds()
    }

    if(cmd === `${prefix}rlbot`){
        message.delete().catch();
        let rembed = new Discord.RichEmbed()
        .setDescription("Bot Has Successfully Reloaded");

        message.channel.send(rembed).then(msg => {msg.delete(5000)});

        loadBot()
    }

});

bot.login(botconfig.token);
