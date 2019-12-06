const Discord = require("discord.js");
const emojiFile = require("../emoji.js");

module.exports.run = async (bot, message, args) => {
    message.channel.send(`Now returning KCGuard's emojis.`);
    
    let emojiCheer = await emojiFile.useEmoji(bot,message,"cheer");
    let emojiDirection = await emojiFile.useEmoji(bot,message,"direction");
    let emojiNeutral = await emojiFile.useEmoji(bot,message,"neutral");
    let emojiPonder = await emojiFile.useEmoji(bot,message,"ponder");
    let emojiSuccess = await emojiFile.useEmoji(bot,message,"success");
    let emojiThinking = await emojiFile.useEmoji(bot,message,"thinking");

    message.channel.send(`Cheer: ${await emojiCheer}`);
    message.channel.send(`Direction: ${await emojiDirection}`);
    message.channel.send(`Neutral: ${await emojiNeutral}`);
    message.channel.send(`Ponder: ${await emojiPonder}`);
    message.channel.send(`Success: ${await emojiSuccess}`);
    message.channel.send(`Thinking: ${await emojiThinking}`);
    return message.channel.send(`Finished.`);
};

module.exports.help = {
    name: "test"
};