const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    return message.reply(`${message.guild.iconURL}`)
};

module.exports.help = {
    name: "serverphoto"
};