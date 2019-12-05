const Discord = require("discord.js");

function createEmoji(bot){
    bot.guild.createEmoji('https://i.imgur.com/w3duR07.png', 'kcSuccess')
        .then(useEmoji(bot))
        .catch(console.error);
}

function useEmoji(bot) {
    if (bot.emojis.find(emoji => emoji.name === "kcSuccess")){
        return message.channel.send(`Found`);
       // let emoji = bot.emojis.find(emoji => emoji.name === "kcSuccess");
       // return message.channel.send(`${emoji}`);
    } else {
        createEmoji(bot)
    }
}

module.exports.run = async (bot, message, args) => {
    useEmoji(bot)
};

module.exports.help = {
    name: "emoji"
};