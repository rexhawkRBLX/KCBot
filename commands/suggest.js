const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  return await message.reply(`YEEEHAW`);
};

module.exports.help = {
    name: "suggest"
};
