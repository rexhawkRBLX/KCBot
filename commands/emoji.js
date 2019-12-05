const Discord = require("discord.js");

function createEmoji(bot,message){
    let role = message.guild.roles.find(role => role.name === "King City");
    if (role) {
        message.guild.createEmoji(require("./../retrieveInfo").kcEmoji.success, 'kcSuccess', [role])
            .then(function () {
                useEmoji(bot, message);
            })
            .catch(console.error);
    }
}

function useEmoji(bot,message) {
    let emoji = bot.emojis.find(emoji => emoji.name === "kcSuccess");
    if (emoji){
        return message.channel.send(`${emoji}`);
    } else {
        createEmoji(bot,message)
    }
}

module.exports.run = async (bot, message, args) => {
    useEmoji(bot,message)
};

module.exports.help = {
    name: "emoji"
};