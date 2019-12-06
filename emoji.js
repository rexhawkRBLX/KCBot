const emojiNames = {["cheer"]: "kcCheer",["direction"]: "kcDirection",["neutral"]: "kcNeutral",["ponder"]: "kcPonder",["success"]: "kcSuccess",["thinking"]: "kcThinking"};

function createEmoji(bot,message,emoji){
    let role = message.guild.roles.find(role => role.name === "King City");
    if (role) {
        message.guild.createEmoji(require("./retrieveInfo").kcEmoji[emoji], emojiNames[emoji], [role])
            .then(function () {
                useEmojiLocal(bot,message,emoji)
            })
            .catch(error => {
                message.channel.send(`**Error: **${error}`)
            });
    }
}

function useEmojiLocal(bot,message,emoji){
    let emojiValue = bot.emojis.find(emojiValue => emojiValue.name === emojiNames[emoji]);
    if (emojiValue){
        return emojiValue;
    } else {
        createEmoji(bot,message,emoji);
    }
}

module.exports.useEmoji = async (bot,message,emoji) => {
    let Emoji = await useEmojiLocal(bot,message,emoji)
    return Emoji
};