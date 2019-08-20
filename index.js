const http = require("http");

const bot_config = require("./botconfig.json");
const express = require("express");
const Discord = require("discord.js");
const bot_token = process.env.token;
const PORT = process.env.PORT || 3000;
const app = express();
const bot = new Discord.Client({disableEveryone: true});
const modlogChannelID = '606575885906083901';
const roblox = require('roblox-js');

let groupId = 4876110;
let maximumRank = 152;
let username = process.env.rblxUser;
let password = process.env.rblxPassword;

function login() {
    return roblox.login(username, password);
}
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

bot.on("ready", async() => {
    console.log(`${bot.user.username} is online!`);
    bot.channels.get('569673111516217345').send(':white_check_mark: KC Bot is online!');
    bot.channels.get('569673111516217345').send('<@' + 551451030471049222 + '> good morning, father.');
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
           message.channel.send(`${message.author} :white_check_mark: Initiating shutdown process...`)
           .then(msg => bot.destroy())
               .then(() => bot.login(process.env.token));
           await message.delete();
           return
       } else{
           await message.delete();
           return message.channel.send(`${message.author} :x: You don't have the permission to execute this command.`);
       }
   }

    if (cmd === `${prefix}shutdown`){
        if (message.member.hasPermission("ADMINISTRATOR")){
            message.channel.send(`${message.author} :white_check_mark: Shutting down...`);
            if (message.author.id === "551451030471049222") {
                message.channel.send(`Goodnight, father.`);
            }
            await bot.destroy();
            return
        } else{
            await message.delete();
            return message.channel.send(`${message.author} :x: You don't have the permission to execute this command.`);
        }
    }

    if (cmd === `${prefix}role`){
        if (message.member.hasPermission("ADMINISTRATOR")){
            let localArgs = messageArray.slice(2);
            let username = localArgs[0];
            let rankIdentifier = localArgs[1];
            if (!rankIdentifier) return message.channel.send("Please enter a rank");
            if (username) {
                message.channel.send(`Checking ROBLOX for ${username}`);
                roblox.getIdFromUsername(username)
                    .then(function (id) {
                        roblox.getRankInGroup(groupId, id)
                            .then(function (rank) {
                            if (maximumRank <= rank) {
                                message.channel.send(`${id} is rank ${rank} and not promotable.`)
                            } else {
                                message.channel.send(`${id} is rank ${rank} and promotable.`)
                                roblox.setRank(groupId, id, rankIdentifier)
                                    .then(function (newRole) {
                                        message.channel.send(`Changed rank to ${newRole.Name}`)
                                    }).catch(function (err) {
                                    console.error(err)
                                    message.channel.send("Failed to change rank.")
                                });
                            }
                        }).catch(function (err) {
                            message.channel.send("Couldn't get that player in the group.")
                        })
                    }).catch(function (err) {
                    message.channel.send(`Sorry, but ${username} doesn't exist on ROBLOX.`)
                });
            } else {
                message.channel.send("Please enter a username.")
            }
            return;
        } else{
            await message.delete();
            return message.channel.send(`${message.author} :x: You don't have the permission to execute this command.`);
        }
    }

   if (cmd === `${prefix}ban`){
       if (message.member.hasPermission("ADMINISTRATOR")){
           const arguments = message.content.split(' ').slice(1);
           let member = message.mentions.members.first();
           let member_user = message.mentions.users.first();
           const banReason = arguments.slice(1).join(' ');
           if (!member) {
               try {
                   if (!message.guild.members.get(arguments.slice(0, 1).join(' '))) throw new Error("Couldn't get a Discord user with this userID!");
                   member = message.guild.members.get(arguments.slice(0, 1).join(' '));
                   member = member.user;
               } catch (error) {
                   return await message.reply("Couldn't get a Discord user with this userID!");
               }
           }
           if (member === message.author) return message.channel.send("You can't ban yourself");
           if (!banReason) return message.reply('You forgot to enter a reason for this ban!');
           if (!message.guild.member(member).bannable) return message.reply("You can't ban this user because you the bot has not sufficient permissions!");

           await member.send(`You have been banned from ${message.guild.name} for the following reason(s): ${banReason}`);
           await member.ban(banReason);


           const banConfirmationEmbed = new Discord.RichEmbed()
               .setColor('RED')
               .setDescription(`:white_check_mark: ${member_user.tag} has been successfully banned!`);
           message.channel.send({
               embed: banConfirmationEmbed
           });

           if (modlogChannelID.length !== 0) {
               if (!bot.channels.get(modlogChannelID )) return undefined;
               const banConfirmationEmbedModlog = new Discord.RichEmbed()
                   .setAuthor(`Banned by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
                   .setThumbnail(member_user.displayAvatarURL)
                   .setColor('RED')
                   .setTimestamp()
                   .setDescription(`**Action**: Ban\n**User**: ${member_user.username}#${member_user.discriminator} (${member_user.id})\n**Reason**: ${banReason}`);
               bot.channels.get(modlogChannelID).send({
                   embed: banConfirmationEmbedModlog
               });
           }
           message.delete();
       } else{
           await message.delete();
           return message.channel.send(`${message.author} :x: You don't have the permission to execute this command.`);
       }
   }

    if (cmd === `${prefix}kick`){
        if (message.member.hasPermission("ADMINISTRATOR")){
            const arguments = message.content.split(' ').slice(1);
            let member = message.mentions.members.first();
            let member_user = message.mentions.users.first();
            const kickReason = arguments.slice(1).join(' ');
            if (!member) {
                try {
                    if (!message.guild.members.get(arguments.slice(0, 1).join(' '))) throw new Error("Couldn't get a Discord user with this userID!");
                    member = message.guild.members.get(arguments.slice(0, 1).join(' '));
                    member = member.user;
                } catch (error) {
                    return await message.reply("Couldn't get a Discord user with this userID!");
                }
            }
            if (member === message.author) return message.channel.send("You can't kick yourself");
            if (!kickReason) return message.reply('You forgot to enter a reason for this kick!');
            if (!message.guild.member(member).kickable) return message.reply("You can't kick this user because this but does not have sufficient permissions!");

            await member.send(`You have been kick from ${message.guild.name} for the following reason(s): ${kickReason}`);
            await member.kick(kickReason);

            const kickConfirmationEmbed = new Discord.RichEmbed()
                .setColor('RED')
                .setDescription(`:white_check_mark: ${member_user.tag} has been successfully kicked!`);
            message.channel.send({
                embed: kickConfirmationEmbed
            });

            if (modlogChannelID.length !== 0) {
                if (!bot.channels.get(modlogChannelID )) return undefined;
                const kickConfirmationEmbedModlog = new Discord.RichEmbed()
                    .setAuthor(`Kicked by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
                    .setThumbnail(member_user.displayAvatarURL)
                    .setColor('RED')
                    .setTimestamp()
                    .setDescription(`**Action**: Kick\n**User**: ${member_user.username}#${member_user.discriminator} (${member_user.id})\n**Reason**: ${kickReason}`);
                bot.channels.get(modlogChannelID).send({
                    embed: kickConfirmationEmbedModlog
                });
            }
            message.delete();
        } else{
            await message.delete();
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
       await message.delete();
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
       await message.delete();
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
        await message.delete();
        return message.channel.send(bot_embed);
    }
    if (cmd === `${prefix}say`){
        let localArgs = messageArray.slice(2);
            let bot_embed = new Discord.RichEmbed()
                .setColor(args[0])
                .setDescription(localArgs.join(' '));
        await message.delete();
        return message.channel.send(bot_embed);
    }
    if (cmd === `${prefix}ssay`) {
        let localArgs = messageArray.slice(2);
        let bot_embed = new Discord.RichEmbed()
            .setColor(args[0])
            .setThumbnail("https://cdn.discordapp.com/attachments/579769933219758148/605478475033346081/Icon.png")
            .setDescription(localArgs.join(' '));
        await message.delete();
        return message.channel.send(bot_embed);
    }
    if (cmd === `${prefix}talk`) {
        let localArgs = messageArray.slice(1);
        await message.delete();
        return message.channel.send(localArgs.join(' '));
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