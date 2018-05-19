const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    //.addrole @user <role name>
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Sorry pal, you can't do that.");
        let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!rMember) return message.reply("Could not find that user.");
        let role = args.join(" ").slice(22);
        if(!role) return message.reply("Please specify a role.");
        let gRole = message.guild.roles.find(`name`, role);
        if(!gRole) return message.reply("Couldn't find that role.");

        if(rMember.roles.has(gRole.id)) return message.reply("The user already has that role.");
        await(rMember.addRole(gRole.id));

        try{
            await rMember.send(`Congrats, you have been given the role ${gRole.name}`)
        }catch(e){
        message.channel.send(`Congrats, <@${rMember.id}>, you have been given the role ${gRole.name}`)
    }

    message.channel.send(`${rMember} has successfully been given the role ${gRole.name} by ${message.author}.`)
}

module.exports.help = {
    name: "addrole"
}
