const Discord = require("discord.js");

var Trello = require('trello-node-api')(`cc34781fdd051e02feaa7ed53a63eb52`, `eb64b6913c7804cf66cb729e37285e1577e94b2922bf767c7d9b86561b322eab`);


var data = {
        name: 'suggestion',
        desc: 'this :)',
        pos: 'top',
        idList: '5e1262520612231fb472979f', //REQUIRED
        due: null,
        dueComplete: false,
        urlSource: 'https://example.com',
    };



module.exports.run = async (bot, message, args) => {

  if (String(message.content.split(" ")) === `${require("./../botconfig").prefix}suggest`) {
      await message.delete();
      let richEmbed = new Discord.RichEmbed()
          .setColor("#333333")
          .setTitle("**Command:** >suggest")
          .setDescription("**Description: **Create a new suggestion card in the [suggestions trello](https://trello.com/b/2Aio6E06)\n**Usage: **>suggest [content]\n**Example: **>suggest a statue of rexhawk");
      return await message.channel.send(richEmbed);
  } else {

    Trello.card.create(data).then(function (response) {
        console.log('response ', response);
    }).catch(function (error) {
        console.log('error', error);
    });
    return await message.channel.send("Comlete");
  }
};

module.exports.help = {
    name: "suggest"
};
