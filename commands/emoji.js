const Discord = require("discord.js");

function createEmoji(bot,message){
    message.guild.createEmoji('https://i.imgur.com/w3duR07.png', 'kcSuccess')
        .then(useEmoji(bot,message))
        .catch(console.error);
}

function useEmoji(bot,message) {
    if (message.guild.emojis.find(emoji => emoji.name === "kcSuccess")){
        return message.channel.send(`Found`);
       // let emoji = bot.emojis.find(emoji => emoji.name === "kcSuccess");
       // return message.channel.send(`${emoji}`);
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