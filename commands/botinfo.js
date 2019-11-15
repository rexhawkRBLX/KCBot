const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    let totalFiles = 0;
    fs.readdir("./../commands/", (error, files) => {
        totalFiles = files.length;
    });

    let dateformat = [bot.user.createdAt.getMonth()+1,
        bot.user.createdAt.getDate(),
        bot.user.createdAt.getFullYear()].join('/');
    let bot_embed = new Discord.RichEmbed()
        .setAuthor(bot.user.tag,bot.user.avatarURL)
        .addField("Bot Name", bot.user.username,true)
        .addField("Created on", `${dateformat}`,true)
        .addField("Number of commands",String(totalFiles),true)
        .setFooter(`${bot.user.id} • by rexhawk#0132`)
        .setColor("#689FF5");
    await message.delete();
    return message.channel.send(bot_embed);
};

module.exports.help = {
    name: "botinfo"
};