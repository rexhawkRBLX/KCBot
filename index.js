const http = require("http");

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
    bot.channels.get('569673111516217345').send(':white_check_mark: KC Bot is online!');
    await bot.user.setActivity("King City, California", {type: "PLAYING"});
});

bot.on("message", async message => {
   if (message.author.bot) return;
   if (message.channel.type === "dm") return;

   let prefix = bot_config.prefix;
   let messageArray = message.content.split(" ");
   let cmd = messageArray[0].toLowerCase();
   let args = messageArray.slice(1);

   if (cmd === `${prefix}restart`){
       if (message.member.hasPermission("ADMINISTRATOR")){
           message.delete();
           message.channel.send(`${message.author} :white_check_mark: Initiating shutdown process...`)
           .then(msg => bot.destroy())
               .then(() => bot.login(process.env.token));
           return
       } else{
           message.delete();
           return message.channel.send(`${message.author} :x: You don't have the permission to execute this command.`);
       }
   }
   if (cmd === `${prefix}ban`){
        if (message.member.hasPermission("ADMINISTRATOR")){
            let ban_User = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            let reason = args.join(" ").slice(22);
            let server_name = message.guild.name;
            message.delete();

            if (!ban_User) return message.channel.send("Couldn't find that user!"); // User does not exist
            ban_User.ban(reason).then((ban_User) => {
                message.channel.send(`:wave: ${member.displayName} has been banned.`);
            }).catch(() => {
                message.channel.send("An error occurred.");
            });
            return
        } else{
            message.delete();
            return message.channel.send(`${message.author} :x: You don't have the permission to execute this command.`);
        }
   }

    if (cmd === `${prefix}kick`){
        if (message.member.hasPermission("ADMINISTRATOR")){
            let kick_User = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            let reason = args.join(" ").slice(22);
            let server_name = message.guild.name;

            message.delete();

            if (!kick_User) return message.channel.send("Couldn't find that user!"); // User does not exist

            kick_User.kick(reason).then((ban_User) => {
                message.channel.send(`:wave: ${member.displayName} has been kicked.`);
            }).catch(() => {
                message.channel.send("An error occurred.");
            });
            return
        } else{
            message.delete();
            return message.channel.send(`${message.author} :x: You don't have the permission to execute this command.`);
        }
    }

   if (cmd === `${prefix}report`){
       let reported_User = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
       if (!reported_User) return message.channel.send("Couldn't find that user!");
       let reason = args.join(" ").slice(22);

       let report_Embed = new Discord.RichEmbed()
           .setDescription("Reports")
           .setColor("#f54242")
           .addField("Reported User",`${reported_User} with ID: ${reported_User.id}`)
           .addField("Report by", `${message.author} with ID: ${message.author.id}`)
           .addField("Channel", message.channel)
           .addField("Time", message.createdAt)
           .addField("Reason", reason);
       message.delete();
       return message.channel.send(report_Embed);
   }

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
       message.delete();
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
        message.delete();
        return message.channel.send(bot_embed);
    }
    if (cmd === `${prefix}say`){
        let localArgs = messageArray.slice(2);
            let bot_embed = new Discord.RichEmbed()
                .setColor(args[0])
                .setDescription(localArgs.join(' '));
        message.delete();
        return message.channel.send(bot_embed);
    }
    if (cmd === `${prefix}ssay`){
        let localArgs = messageArray.slice(2);
        let bot_embed = new Discord.RichEmbed()
            .setColor(args[0])
            .setThumbnail("https://cdn.discordapp.com/attachments/579769933219758148/605478475033346081/Icon.png")
            .setDescription(localArgs.join(' '));
        message.delete();
        return message.channel.send(bot_embed);
    }
});


// Prevent exit 143 (Idle exit)

function startKeepAlive() {
    setInterval(function() {
        let options = {
            host: 'kingcity-bot.herokuapp.com',
            port: 80,
            path: '/'
        };
        http.get(options, function(res) {
            res.on('data', function(chunk) {
                try {
                    console.log("Heroku Awake: Prevented 143");
                } catch (err) {
                    console.log(err.message);
                }
            });
        }).on('error', function(err) {
            console.log("Error: " + err.message);
        });
    }, 20 * 60 * 1000); // load every 20 minutes
}


startKeepAlive(); // Keep from idling
bot.login(bot_token).catch(err => console.log(err));