const Discord = require("discord.js");
const emoji = require("../emoji.js");

module.exports.run = async (bot, message, args) => {
   return useEmoji(bot,message,args[0])
};

module.exports.help = {
    name: "test"
};