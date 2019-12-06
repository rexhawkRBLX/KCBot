const emojiNames = {["cheer"]: "kcCheer",["direction"]: "kcDirection",["neutral"]: "kcNeutral",["ponder"]: "kcPonder",["success"]: "kcSuccess",["thinking"]: "kcThinking"};

module.exports.useEmoji = async (bot,message,emoji) => {
    let finishedEmoji;
    message.channel.send("Checking to see if emoji exists already...");
    let emojiValue = bot.emojis.find(emojiValue => emojiValue.name === emojiNames[emoji]);
    message.channel.send("Completed checking if emoji exists already.");
    message.channel.send("Checking if emoji was found...");
    if (emojiValue){
        message.channel.send("Emoji exists");
        finishedEmoji = emojiValue;
    } else {
        message.channel.send("Emoji was not found.");
        message.channel.send("Checking to see if KCGuards role exists");
        let role = message.guild.roles.find(role => role.name === "King City");
        message.channel.send("Done checking to see if role exists.");
       // if (role) {
            message.channel.send("Role exists");
            message.channel.send("Creating emoji");
            message.guild.createEmoji(require("./retrieveInfo").kcEmoji[emoji], emojiNames[emoji], [role])
                .then(emoji => {
                    message.channel.send("Emoji was created.");
                    finishedEmoji = emoji;
                    return finishedEmoji;
                })
                .catch(error => {
                    message.channel.send(`**Error: **${error}`);
                });
        //} else {
         //   message.channel.send("Role does not exist.");
        //}
    }
};