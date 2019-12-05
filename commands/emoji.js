const Discord = require("discord.js");

function createEmoji(bot,message){
    console.log("Three");
    console.log(message.guild.id);
    let role = message.guild.roles.find(role => role.name === "King City");
    if (role) {
        message.guild.createEmoji('https://i.vgy.me/FsRyFm.png', 'kcSuccess', [role])
            .then(function () {
                useEmoji(bot, message);
            })
            .catch(console.error);
    }
}

function useEmoji(bot,message) {
    if (message.guild.emojis.find(emoji => emoji.name === "kcSuccess")){
        console.log("One");
        message.channel.send(`Found`);
        let emoji = bot.emojis.find(emoji => emoji.name === "kcSuccess");
        return message.channel.send(`${emoji}`);
    } else {
        console.log("Two");
        createEmoji(bot,message)
    }
}

module.exports.run = async (bot, message, args) => {
    console.log("Five");
    useEmoji(bot,message)
};

module.exports.help = {
    name: "emoji"
};