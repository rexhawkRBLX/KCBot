const emojiNames = {"cheer": "kcCheer","direction": "kcDirection","neutral": "kcNeutral","ponder": "kcPonder","success": "kcSuccess","thinking": "kcThinking"};

function createEmoji(bot,message,emoji){
    console.log("Five");
    let role = message.guild.roles.find(role => role.name === "King City");
    console.log("Six");
    if (role) {
        console.log("Seven");
        message.guild.createEmoji(require("./retrieveInfo").kcEmoji[emoji.lower], emojiNames[emoji.lower], [role])
            .catch(console.error);
    }
}

module.exports.useEmoji = async (bot,message,emoji) => {
    console.log("One");
    let emojiValue = bot.emojis.find(emojiValue => emojiValue.name === emojiNames[emoji.lower]);
    console.log("Two");
    if (emojiValue){
        console.log("Three");
        return emojiValue;
    } else {
        console.log("Four");
        await createEmoji(bot,message,emoji);
        console.log("HI");
        return bot.emojis.find(emojiValue => emojiValue.name === emojiNames[emoji.lower]);
    }
};