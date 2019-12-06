const emojiNames = {["cheer"]: "kcCheer",["direction"]: "kcDirection",["neutral"]: "kcNeutral",["ponder"]: "kcPonder",["success"]: "kcSuccess",["thinking"]: "kcThinking"};

module.exports.useEmoji = async (bot,message,emoji) => {
    let role = message.guild.roles.find(role => role.name === "King City");
    if (role) {
        message.guild.createEmoji(require("./retrieveInfo").kcEmoji["cheer"], emojiNames["cheer"], [role])
            .catch(error => {
                message.channel.send(`**Error: **${error}`);
            });
        message.guild.createEmoji(require("./retrieveInfo").kcEmoji["direction"], emojiNames["direction"], [role])
            .catch(error => {
                message.channel.send(`**Error: **${error}`);
            });
        message.guild.createEmoji(require("./retrieveInfo").kcEmoji["neutral"], emojiNames["neutral"], [role])
            .catch(error => {
                message.channel.send(`**Error: **${error}`);
            });
        message.guild.createEmoji(require("./retrieveInfo").kcEmoji["ponder"], emojiNames["ponder"], [role])
            .catch(error => {
                message.channel.send(`**Error: **${error}`);
            });
        message.guild.createEmoji(require("./retrieveInfo").kcEmoji["success"], emojiNames["success"], [role])
            .catch(error => {
                message.channel.send(`**Error: **${error}`);
            });
        message.guild.createEmoji(require("./retrieveInfo").kcEmoji["thinking"], emojiNames["thinking"], [role])
            .catch(error => {
                message.channel.send(`**Error: **${error}`);
            });
    }
};