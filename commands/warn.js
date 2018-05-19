const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
let warns = JSON.parse(fs.readFileSync("../warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {
    //.warn @user <reason>

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Nice try, pal.");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!wUser) return message.reply("Couldn't find that user");
    if(wUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Cannot warn that user");
    let reason = args.join(" ").slice(22);
    if(!reason) return message.channel.send("Please state a reason.");

    if(!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    };

    warns[wUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    let warnEmbed = new Discord.RichEmbed()
    .setDescription("~Warns~")
    .setColor("#a5039d")
    .addField("__Warned By__", message.author)
    .addField("__Warned User__", `<@${wUser.id}>`)
    .addField("__Warned In__", message.channel)
    .addField("__Number of Warnings___", warns[wUser.id].warns)
    .addField("__Reason__", reason);

    let warnchannel = message.guild.channels.find(`name`, "punishments");
    if(!warnchannel) return message.reply("Couldn't find channel");

    warnchannel.send(warnEmbed);

    if(warns[wUser.id].warns == 3){
        let mutetime = "10m"
        let muterole = message.guild.roles.find(`name`, "muted");

        await(wUser.addRole(muterole.id));
        message.channel.send(`<@${wUser.id}> has been muted for ${ms(ms(mutetime))}`);

        setTimeout(function(){
            wUser.removeRole(muterole.id);
            message.channel.send(`<@${wUser.id}> has been unmuted.`);
        }, ms(mutetime));
    }

    if(warns[wUser.id].warns == 5){
        let mutetime = "30m"
        let muterole = message.guild.roles.find(`name`, "muted");

        await(wUser.addRole(muterole.id));
        message.channel.send(`<@${wUser.id}> has been muted for ${ms(ms(mutetime))}`);

        setTimeout(function(){
            wUser.removeRole(muterole.id);
            message.channel.send(`<@${wUser.id}> has been unmuted.`);
        }, ms(mutetime));
    }

    if(warns[wUser.id].warns == 7){
        let mutetime = "1h"
        let muterole = message.guild.roles.find(`name`, "muted");

        await(wUser.addRole(muterole.id));
        message.channel.send(`<@${wUser.id}> has been muted for ${ms(ms(mutetime))}`);

        setTimeout(function(){
            wUser.removeRole(muterole.id);
            message.channel.send(`<@${wUser.id}> has been unmuted.`);
        }, ms(mutetime));
    }

    if(warns[wUser.id].warns == 8){
        message.guild.member(wUser).kick("8 Warnings - RandomBot Warning System")
    }

    if(warns[wUser.id].warns == 9){
        let mutetime = "2h"
        let muterole = message.guild.roles.find(`name`, "muted");

        await(wUser.addRole(muterole.id));
        message.channel.send(`<@${wUser.id}> has been muted for ${ms(ms(mutetime))}`);

        setTimeout(function(){
            wUser.removeRole(muterole.id);
            message.channel.send(`<@${wUser.id}> has been unmuted.`);
        }, ms(mutetime));
    }

    if(warns[wUser.id].warns == 10){
        message.guild.member(wUser).ban("10 Warnings - RandomBot Warning System")
    }
}

module.exports.help = {
    name: "warn"
}
