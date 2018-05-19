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

        if(!rMember.roles.has(gRole.id)) return message.reply("The user does not have that role.");
        await(rMember.removeRole(gRole.id));

        try{
            await rMember.send(`You have lost the role ${gRole.name}.`)
        }catch(e){
        if(e) console.log(e);
    }
        message.channel.send(`${message.author} has successfully taken the role ${gRole.name} from ${rMember}.`)
}

module.exports.help = {
    name: "removerole"
}
