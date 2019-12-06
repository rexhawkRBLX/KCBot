const emojiNames = {["cheer"]: "kcCheer",["direction"]: "kcDirection",["neutral"]: "kcNeutral",["ponder"]: "kcPonder",["success"]: "kcSuccess",["thinking"]: "kcThinking"};

module.exports.useEmoji = async (bot,message,emoji) => {
    let emojiValue = bot.emojis.find(emojiValue => emojiValue.name === emojiNames[emoji]);
    if (emojiValue){
        return emojiValue;
    } else {
        let role = message.guild.roles.find(role => role.name === "King City");
        if (role) {
            message.guild.createEmoji(require("./retrieveInfo").kcEmoji[emoji], emojiNames[emoji], [role])
                .then(emoji => {
                    return emoji
                })
                .catch(error => {
                    message.channel.send(`**Error: **${error}`)
                });
        }
    }
};