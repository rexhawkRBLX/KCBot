const Discord = require("discord.js");
const emoji = require("../emoji.js");

module.exports.run = async (bot, message, args) => {
   return message.channel.send(args[0]);
};

module.exports.help = {
    name: "test"
};