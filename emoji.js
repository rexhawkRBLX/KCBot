const emojiNames = {["cheer"]: "kcCheer",["direction"]: "kcDirection",["neutral"]: "kcNeutral",["ponder"]: "kcPonder",["success"]: "kcSuccess",["thinking"]: "kcThinking"};

function createEmoji(bot,message,emoji){
    let role = message.guild.roles.find(role => role.name === "King City");
    if (role) {
        message.guild.createEmoji(`./kcEmoji/${emoji}.png`, emojiNames[emoji], [role])
            .catch(error => {
                message.channel.send(`**Error: **${error}`)
            });
    }
}

module.exports.useEmoji = async (bot,message,emoji) => {
    let emojiValue = bot.emojis.find(emojiValue => emojiValue.name === emojiNames[emoji]);
    if (emojiValue){
        return emojiValue;
    } else {
        await createEmoji(bot,message,emoji);
        return await module.useEmoji(bot,message,emoji);
    }
};