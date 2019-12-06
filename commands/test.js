const Discord = require("discord.js");
const emojiFile = require("../emoji.js");

module.exports.run = async (bot, message, args) => {
    let emoji = await emojiFile.useEmoji(bot,message,args[0]);
    if (emoji) {
        return message.channel.send(`${emoji}`);
    } else {
        return message.channel.send("Error");
    }
};

module.exports.help = {
    name: "test"
};