const emojiNames = {["cheer"]: "kcCheer",["direction"]: "kcDirection",["neutral"]: "kcNeutral",["ponder"]: "kcPonder",["success"]: "kcSuccess",["thinking"]: "kcThinking"};

function createEmoji(bot,message,emoji,_callback){
    let role = message.guild.roles.find(role => role.name === "King City");
    if (role) {
        message.guild.createEmoji(require("./retrieveInfo").kcEmoji[emoji], emojiNames[emoji], [role])
            .catch(error => {
                message.channel.send(`**Error: **${error}`)
            });
        _callback();
    }
}

function useEmojiLocal(bot,message,emoji){
    let emojiValue = bot.emojis.find(emojiValue => emojiValue.name === emojiNames[emoji]);
    if (emojiValue){
        return emojiValue;
    } else {
        createEmoji(bot,message,emoji, function(){
            return entryPoint(bot,message,emoji);
        });
    }
}

function entryPoint(bot,message,emoji){
    useEmojiLocal(bot,message,emoji)
}

module.exports.useEmoji = async (bot,message,emoji) => {
    entryPoint(bot,message,emoji)
};