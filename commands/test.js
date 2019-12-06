const Discord = require("discord.js");
const emojiFile = require("../emoji.js");

module.exports.run = async (bot, message, args) => {
    await emojiFile.useEmoji(bot,message,args[0]);
    return message.channel.send(`Finished.`);
};

module.exports.help = {
    name: "test"
};