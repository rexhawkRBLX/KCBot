const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (message.member.roles.has(637802573914570752)){
    return await message.reply(`found role`);
  } else {
    return await message.reply(`role was not found`);
  }
};

module.exports.help = {
    name: "suggest"
};
