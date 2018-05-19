const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	let fortunes = ["No matter what your past has been, you have a spotless future.", "In human endeavor, chance favors the prepared mind.", "The world is always ready to receive talent with open arms.", "Your high-minded principles spell success.", "Customer service is like taking a bath you have to keep doing it.", "The days that make us happy make us wise.", "Many folks are about as happy as they make up their minds to be.", "They say you are stubborn; you call it persistence.", "Don't 'face' reality, let it be the place from which you leap.", "A new business venture is on the horizon.", "A well-aimed spear is worth three.", "An upward movement initiated in time can counteract fate.", "You can choose, right now and in every moment, to put your powerful and effective abilities to purposeful use. There is always something you can do, no matter what the situation may be, that will move your life forward.", "You will be forced to face fear, but if you do not run, fear will be afraid of you.", "Never regret anything that made you smile."];

    let fortune = Math.floor((Math.random() * fortunes.length));

    let embed = new Discord.RichEmbed()
    .setTitle(`${message.author.username}'s Fortune`)
    .setDescription(fortunes[fortune])
    .setColor("#79e527")
}

module.exports.help = {
	name: "fortune"
}