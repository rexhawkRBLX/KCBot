const Discord = require("discord.js");
const emoji = require("../emoji.js");

module.exports.run = async (bot, message, args) => {
    let emoji = emoji.useEmoji(bot,message,args[0]);
    if (emoji) {
        return message.channel.send(`${emoji}`);
    } else {
        return message.channel.send("Error");
    }
};

module.exports.help = {
    name: "test"
};