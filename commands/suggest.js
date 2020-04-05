const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if (String(message.content.split(" ")) === `${require("./../botconfig").prefix}suggest`) {
      await message.delete();
      let richEmbed = new Discord.RichEmbed()
          .setColor("#333333")
          .setTitle("**Command:** >suggest")
          .setDescription("**Description: **Create a new suggestion card in the [suggestions trello](https://trello.com/b/2Aio6E06)\n**Usage: **>suggest [content]\n**Example: **>suggest flying cars!");
      return message.channel.send(richEmbed);
  }

  if (message.member.roles.has("637802573914570752")){
    return await message.reply(`found role`);
  } else {
    return await message.reply(`You must be verified to use this feature.`);
  }
};

module.exports.help = {
    name: "suggest"
};
