const Discord = require("discord.js");

let TrelloAPI = process.env.trelloAPIKey;
let TrelloAuth = process.env.trelloAuthKey;

let Trello = require('trello-node-api')(TrelloAPI.toString(), TrelloAuth.toString());

function calcTime() {
    let date = new Date();
    let utc = date.getTime() + (date.getTimezoneOffset() * 60000);

    let time = new Date(utc + (3600000*"-4"));

    // return time as a string
    return time.toLocaleString();
}



module.exports.run = async (bot, message, args) => {

  if (String(message.content.split(" ")) === `${require("./../botconfig").prefix}suggest`) {
      await message.delete();
      let richEmbed = new Discord.RichEmbed()
          .setColor("#333333")
          .setTitle("**Command:** >suggest")
          .setDescription("**Description: **Create a new suggestion card in the [suggestions trello](https://trello.com/b/2Aio6E06)\n**Usage: **>suggest [content]\n**Example: **>suggest a statue of rexhawk");
      return await message.channel.send(richEmbed);
  } else {
    let localArgs = message.content.split(" ").slice(1);
    let currentDate = new Date();

    let data = {
        name: localArgs.join(' '),
        desc: `Contributor: ${message.member.user.tag}\nDate: ${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getFullYear()}\nTime: ${calcTime()}`,
        idList: '5e1262520612231fb472979f', //REQUIRED
        idLabels: ['5e8a029d7bfaf66944b95d10'],
        urlSource: 'https://example.com',
    };

    Trello.card.create(data).then(function (response) {
        console.log('response ', response);
    }).catch(function (error) {
        console.log('error', error);
    });
    return await message.channel.send("Complete");
  }
};

module.exports.help = {
    name: "suggest"
};
