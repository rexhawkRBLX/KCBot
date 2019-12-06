const emojiNames = {"cheer": "kcCheer","direction": "kcDirection","neutral": "kcNeutral","ponder": "kcPonder","success": "kcSuccess","thinking": "kcThinking"};

function createEmoji(bot,message,emoji){
    let role = message.guild.roles.find(role => role.name === "King City");
    if (role) {
        message.guild.createEmoji(require("./retrieveInfo").kcEmoji[emoji.lower], emojiNames[emoji.lower], [role])
            .then(function () {
                useEmoji(bot, message, emoji);
            })
            .catch(console.error);
    }
}

function useEmoji(bot,message,emoji) {
    let emojiValue = bot.emojis.find(emojiValue => emojiValue.name === emojiNames[emoji.lower]);
    if (emojiValue){
        return emojiValue;
    } else {
        createEmoji(bot,message,emoji)
    }
}