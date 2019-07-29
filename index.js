const bot_config = require("./botconfig.json");
const express = require("express");
const Discord = require("discord.js");
const bot_token = process.env.token;
const PORT = process.env.PORT || 3000;
const app = express();
const bot = new Discord.Client({disableEveryone: true});

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

bot.on("ready", async() => {
    console.log(`${bot.user.username} is online!`);
    await bot.user.setActivity("a movie", {type: "WATCHING"});
});

bot.on("message", async message => {
   if (message.author.bot) return;
   if (message.channel.type === "dm") return;

   let prefix = bot_config.prefix;
   let messageArray = message.content.split(" ");
   let cmd = messageArray[0];
   let args = messageArray.slice(1);

   if (cmd === `${prefix}serverinfo`){
       let s_icon = message.guild.iconURL;
       let server_embed = new Discord.RichEmbed()
           .setDescription("Server Information")
           .setColor("#f54242")
           .setThumbnail(s_icon)
           .addField("Server name", message.guild.name)
           .addField("Created on", message.guild.createdAt)
           .addField("You joined",message.member.joinedAt)
           .addField("Total members", message.guild.memberCount);

       return message.channel.send(server_embed);
   }

    if (cmd === `${prefix}botinfo`){
        let b_icon = bot.user.displayAvatarURL;
        let bot_embed = new Discord.RichEmbed()
            .setDescription("Bot Information")
            .setColor("#f54242")
            .setThumbnail(b_icon)
            .addField("Bot Name", bot.user.username)
            .addField("Created on", bot.user.createdAt);
        return message.channel.send(bot_embed);
    }

    if (cmd === `${prefix}say`){
        let localArgs = messageArray.slice(2);
            let bot_embed = new Discord.RichEmbed()
                .setColor(args[0])
                .setDescription(localArgs.join(' '));
            return message.channel.send(bot_embed);
    }
    if (cmd === `${prefix}ssay`){
        let localArgs = messageArray.slice(2);
        let bot_embed = new Discord.RichEmbed()
            .setColor(args[0])
            .setThumbnail("https://cdn.discordapp.com/attachments/579769933219758148/605478475033346081/Icon.png")
            .setDescription(localArgs.join(' '));
        return message.channel.send(bot_embed);
    }
});

bot.login(bot_token).catch(err => console.log(err));