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

    let returnedMessage = await message.channel.send(`Cheer: ${await emojiCheer}`);
    await returnedMessage.edit(`${returnedMessage.content}\nDirection: ${await emojiDirection}`);
    await returnedMessage.edit(`${returnedMessage.content}\nNeutral: ${await emojiNeutral}`);
    await returnedMessage.edit(`${returnedMessage.content}\nPonder: ${await emojiPonder}`);
    await returnedMessage.edit(`${returnedMessage.content}\nSuccess: ${await emojiSuccess}`);
    await returnedMessage.edit(`${returnedMessage.content}\nThinking: ${await emojiThinking}`);
    
    return message.channel.send(`Finished.`);
};

module.exports.help = {
    name: "test"
};