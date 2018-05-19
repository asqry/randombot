const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    //.tempmute @user 1s/m/h/d
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.reply("Couldn't find user.");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You are not authorized to use this command");
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("That user can't be muted.");
    let muterole = message.guild.roles.find(`name`, "muted");
    if(!muterole){
        try{
            muterole = await message.guild.createRole({
                name: "muted",
                color: "#000000",
                permissions:[]
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        }catch(e){
            console.log(e.stack);
        }
    }
    let mutetime = args[1];
    if(!mutetime) return message.reply("Please specify a time and try again");

    await(tomute.addRole(muterole.id));
    message.channel.send(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);
    tomute.send(`You have been muted on ${message.guild.name} for ${ms(ms(mutetime))}`);

    setTimeout(function(){
        tomute.removeRole(muterole.id);
        message.channel.send(`<@${tomute.id}> has been unmuted.`);
    }, ms(mutetime));
}

module.exports.help = {
    name: "tempmute"
}
