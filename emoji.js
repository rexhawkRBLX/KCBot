const emojiNames = {["cheer"]: "kcCheer",["direction"]: "kcDirection",["neutral"]: "kcNeutral",["ponder"]: "kcPonder",["success"]: "kcSuccess",["thinking"]: "kcThinking"};

module.exports.useEmoji = async (bot,message,emoji) => {
    let emojiValue = bot.emojis.find(emojiValue => emojiValue.name === emojiNames[emoji]);
    if (emojiValue){
        return await emojiValue;
    }
};