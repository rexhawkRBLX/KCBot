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
          .setDescription("**Description: **Create a new suggestion card in the [suggestions trello list](https://trello.com/b/2Aio6E06)\n**Usage: **>suggest [content]\n**Example: **>suggest a statue of rexhawk");
      return await message.channel.send(richEmbed);
  } else {
    let localArgs = message.content.split(" ").slice(1);

    let data = {
        name: localArgs.join(' '),
        desc: `Contributor: ${message.member.user.tag}\nDate / Time (EST): ${calcTime()}`,
        idList: '5e1262520612231fb472979f', //REQUIRED
        idLabels: ['5e8a029d7bfaf66944b95d10','5e1262fb07d03a18361ac073'],
    };

    Trello.card.create(data).then(function (response) {
      let richEmbed = new Discord.RichEmbed()
          .setColor("#008B8B")
          .setDescription(`Complete! You can find your new suggestion [here](${response.shortUrl}).`);
      return message.channel.send(richEmbed);
      // console.log('response ', response);
    }).catch(function (error) {
      let richEmbed = new Discord.RichEmbed()
          .setColor("#CD5555")
          .setTitle("An Error Occurred")
          .setDescription(error);
      return message.channel.send(richEmbed);
      // console.log('error', error);
    });

  }
};

module.exports.help = {
    name: "suggest"
};
