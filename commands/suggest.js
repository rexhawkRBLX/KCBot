const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  return await message.reply(`trumps awesome right lol`);
};

module.exports.help = {
    name: "suggest"
};
