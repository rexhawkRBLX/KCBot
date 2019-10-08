const http = require("http");

const bot_config = require("./botconfig.json");
const express = require("express");
const Discord = require("discord.js");
const bot_token = process.env.token;
const PORT = process.env.PORT || 3000;
const app = express();
const bot = new Discord.Client({disableEveryone: true});
const modlogChannelID = '592492329257140234';
const roblox = require('noblox.js');
const version = "v".concat("1");
let groupId = 4876110;
let maximumRank = 252;

let cookie = process.env.rblxCookie;

function login() {
    return roblox.cookieLogin(cookie);
}
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

bot.on("ready", async() => {
    console.log(`${bot.user.username} is online!`);
    bot.channels.get('592492329257140234').send('KC Bot is online back online...');
    await bot.user.setActivity("King City, California", {type: "PLAYING"});
});

bot.on("message", async message => {
   if (message.author.bot) return;
   if (message.channel.type === "dm") return;

   let prefix = bot_config.prefix;
   let messageArray = message.content.split(" ");
   let cmd = messageArray[0].toLowerCase();
   let args = messageArray.slice(1);

   function helpBox (command){
       if (command === String("role")){
           let richEmbed = new Discord.RichEmbed()
               .setColor("#333333")
               .setTitle("**Command:** >role");
           let array = ["**Description: **Role a player in the group straight from discord", "**Usage: **>role [username] [rank]", "**Example: **>role rexhawk 240"];
           richEmbed.setDescription(array.join('\n'));
           return richEmbed;
       } else if (command === String("report")){
           let richEmbed = new Discord.RichEmbed()
               .setColor("#333333")
               .setTitle("**Command:** >report")
               .setFooter("Abuse of this command will result in administrative action.");
           let array = ["**Description: **Report a member for later moderation", "**Usage: **>report [user] [reason]", "**Example: **>report @rexhawk being too beautiful!"];
           richEmbed.setDescription(array.join('\n'));
           return richEmbed;
       } else if (command === String("ban")) {
           let richEmbed = new Discord.RichEmbed()
               .setColor("#333333")
               .setTitle("**Command:** >ban");
           let array = ["**Description: **Ban a member from the server", "**Usage: **>ban [user] [reason]", "**Example: **>ban @rexhawk being too beautiful!"];
           richEmbed.setDescription(array.join('\n'));
           return richEmbed;
       }else if (command === String("kick")) {
           let richEmbed = new Discord.RichEmbed()
               .setColor("#333333")
               .setTitle("**Command:** >kick");
           let array = ["**Description: **Kick a member from the server", "**Usage: **>kick [user] [reason]", "**Example: **>kick @rexhawk being too beautiful!"];
           richEmbed.setDescription(array.join('\n'));
           return richEmbed;
       }else if (command === String("say")) {
           let richEmbed = new Discord.RichEmbed()
               .setColor("#333333")
               .setTitle("**Command:** >say");
           let array = ["**Description: **Make KCBot say message inside of rich embed", "**Usage: **>say [COLOR] [message]", "**Example: **>say RED rexhawk is too beautiful!"];
           richEmbed.setDescription(array.join('\n'));
           return richEmbed;
       }else if (command === String("server_say")) {
           let richEmbed = new Discord.RichEmbed()
               .setColor("#333333")
               .setTitle("**Command:** >server_say");
           let array = ["**Description: **Make KCBot say message inside of rich embed with CHP's logo", "**Usage: **>server_say [COLOR] [message]", "**Example: **>say RED rexhawk is too beautiful!"];
           richEmbed.setDescription(array.join('\n'));
           return richEmbed;
       }else if (command === String("talk")) {
           let richEmbed = new Discord.RichEmbed()
               .setColor("#333333")
               .setTitle("**Command:** >talk");
           let array = ["**Description: **Make KCBot say message", "**Usage: **>talk [message]", "**Example: **>talk rexhawk is too beautiful!"];
           richEmbed.setDescription(array.join('\n'));
           return richEmbed;
       }
   }

   // Restart
   if (cmd === `${prefix}restart`){
       if (message.member.hasPermission("ADMINISTRATOR")){
           message.channel.send(`${message.author} :white_check_mark: Initiating`.concat("`","restart","` process..."))
           .then(msg => bot.destroy())
               .then(() => bot.login(process.env.token));
           await message.delete();
           return
       } else{
           await message.delete();
           return message.channel.send(`${message.author} :negative_squared_cross_mark: You must have the `.concat("`","Administrator","` permission to execute this command."));
       }
   }

    if (cmd === `${prefix}info`){
        let rich_Embed = new Discord.RichEmbed()
            .setTitle("Game Information")
            .setThumbnail("https://cdn.discordapp.com/attachments/622223331915202560/622551240626143232/King_City_CA.png")
            .setFooter("Additional Information can be found in the #information channel of the King City server.")
            .setColor("#689ff5")
            .addField("King City Game",`[King City, California](https://www.roblox.com/games/3571375889/King-City-California)`)
            .addField("King City Groups", `[California Highway Patrol](https://www.roblox.com/groups/4876110/California-Highway-Patrol-Coastal-Division)\n[King City Police Department](https://www.roblox.com/groups/4897046/King-City-Police-Department)\n[King City Fire Department](https://www.roblox.com/groups/4898855/King-City-Fire-Department)`)
            .addField("Discord Servers",`[King City](https://discord.gg/dVtCgDh)\n[California Highway Patrol](https://discord.gg/syXRhgh)\n[King City Police Department](https://discord.gg/M3WKaBe)\n[King City Fire Department](https://discord.gg/Be3uZJx)`)
        return message.reply(rich_Embed);
    }

    if (cmd === `${prefix}shutdown`){
        if (message.member.hasPermission("ADMINISTRATOR")){
            message.channel.send(`${message.author} :white_check_mark: Initiating`.concat("`","shutdown","` process..."));
            await bot.destroy();
            return
        } else{
            await message.delete();
            return message.channel.send(`${message.author} :negative_squared_cross_mark: You must have the `.concat("`","Administrator","` permission to execute this command."));
        }
    }

    if (cmd === `${prefix}role`){
        if (message.member.hasPermission("ADMINISTRATOR")){
            // If there is no arguments
            if (String(message.content.split(" ")) === `${prefix}role`) {
                await message.delete();
                let richEmbed = helpBox("role");
                return message.channel.send(richEmbed);
            }
            let localArgs = messageArray.slice(1);
            let username = localArgs[0];
            let rankIdentifier = localArgs[1];
            await roblox.cookieLogin(cookie);
            await roblox.getCurrentUser();
            if (!rankIdentifier) return message.channel.send("Please enter a rank");
            if (username) {
                roblox.getIdFromUsername(username)
                    .then(function (id) {
                        roblox.getRankInGroup(groupId, id)
                            .then(function (rank) {
                            if (maximumRank <= rank) {
                                message.channel.send(`${id} is rank ${rank} and not promotable.`);
                            } else {
                                roblox.setRank(Number(groupId), Number(id), rankIdentifier)
                                    .then(function(newRole){
                                        message.channel.send(`Changed rank to ${newRole.name}`)
                                    }).catch(function (err) {
                                    console.error(err);
                                    message.channel.send(`Failed to change rank. ${err}`)
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
       if (message.member.hasPermission("BAN_MEMBERS")){
           // If there is no arguments
           if (String(message.content.split(" ")) === `${prefix}ban`) {
               await message.delete();
               let richEmbed = helpBox("ban");
               return message.channel.send(richEmbed);
           }
           const arguments = message.content.split(' ').slice(1);
           let member = message.mentions.members.first();
           let member_user = message.mentions.users.first();
           const banReason = arguments.slice(1).join(' ');
           if (!member) {
               try {
                   if (!message.guild.members.get(arguments.slice(0, 1).join(' '))) throw new Error(":negative_squared_cross_mark: Couldn't get a Discord user with this userID");
                   member = message.guild.members.get(arguments.slice(0, 1).join(' '));
                   member = member.user;
               } catch (error) {
                   return await message.reply(":negative_squared_cross_mark: Couldn't get a Discord user with this userID");
               }
           }
           if (member === message.author) return message.channel.send("You can't ban yourself... :unamused:");
           if (!banReason) return message.reply('You forgot to enter a reason for this ban');
           if (!message.guild.member(member).bannable) return message.reply("You can't ban this user because the bot does not have sufficient permissions");

           await member.send(`You have been banned from ${message.guild.name} for the following reason(s): ${banReason}`);
           await member.ban(banReason);


           const banConfirmationEmbed = new Discord.RichEmbed()
               .setColor('RED')
               .setDescription(`:white_check_mark: `.concat("`",`${member_user.tag}`,"` has been successfully banned!"));
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
           return message.channel.send(`${message.author} :negative_squared_cross_mark: You must have the `.concat("`","ban_members","` permission to execute this command."));
       }
   }

    if (cmd === `${prefix}kick`){
        if (message.member.hasPermission("KICK_MEMBERS")){
            // If there is no arguments
            if (String(message.content.split(" ")) === `${prefix}kick`) {
                await message.delete();
                let richEmbed = helpBox("kick");
                return message.channel.send(richEmbed);
            }
            const arguments = message.content.split(' ').slice(1);
            let member = message.mentions.members.first();
            let member_user = message.mentions.users.first();
            const kickReason = arguments.slice(1).join(' ');
            if (!member) {
                try {
                    if (!message.guild.members.get(arguments.slice(0, 1).join(' '))) throw new Error("Couldn't get a Discord user with this userID");
                    member = message.guild.members.get(arguments.slice(0, 1).join(' '));
                    member = member.user;
                } catch (error) {
                    return await message.reply("Couldn't get a Discord user with this userID");
                }
            }
            if (member === message.author) return message.channel.send("You can't ban yourself... :unamused:");
            if (!kickReason) return message.reply('You forgot to enter a reason for this kick');
            if (!message.guild.member(member).kickable) return message.reply("You can't ban this user because the bot does not have sufficient permissions");

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
            return message.channel.send(`${message.author} :negative_squared_cross_mark: You must have the `.concat("`","kick_members","` permission to execute this command."));
        }
    }

   if (cmd === `${prefix}report`){
       // If there is no arguments
       if (String(message.content.split(" ")) === `${prefix}report`) {
           await message.delete();
           let richEmbed = helpBox("report");
           return message.channel.send(richEmbed);
       }
       let reported_User = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
       if (!reported_User) return message.channel.send("Couldn't find that user!");
       let reason = args.join(" ").slice(22);

       let reportEmbed = new Discord.RichEmbed()
           .setColor("#f54242")
           .setAuthor(message.author.tag,message.author.avatarURL)
           .setDescription(`Reporting ${reported_User}`)
           .addField("Reason","`".concat(reason,"`"))
           .setTimestamp(message.createdAt);
       await message.delete();
       await bot.channels.get("630934304393920512").send(reportEmbed);
       return message.channel.send(`:white_check_mark: Successfully reported ${String(reported_User)} for `.concat("`",`${reason}`,"`."));
   }
   if (cmd === `${prefix}version`){
        return message.channel.send(version);
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
        if (message.member.hasPermission("KICK_MEMBERS")) {
            if (message.member.hasPermission("BAN_MEMBERS")) {
                // If there is no arguments
                if (String(message.content.split(" ")) === `${prefix}say`) {
                    await message.delete();
                    let richEmbed = helpBox("say");
                    return message.channel.send(richEmbed);
                }
                let localArgs = messageArray.slice(2);
                let bot_embed = new Discord.RichEmbed()
                    .setColor(args[0])
                    .setDescription(localArgs.join(' '));
                await message.delete();
                return message.channel.send(bot_embed);
            }else {
                await message.delete();
                return message.channel.send(`${message.author} :negative_squared_cross_mark: You must have the `.concat("`","kick_members, ban_members","` permission to execute this command."));
            }
        }else {
            await message.delete();
            return message.channel.send(`${message.author} :negative_squared_cross_mark: You must have the `.concat("`","kick_members, ban_members","` permission to execute this command."));
        }
    }
    if (cmd === `${prefix}server_say`) {
        if (message.member.hasPermission("KICK_MEMBERS")) {
            if (message.member.hasPermission("BAN_MEMBERS")) {
                // If there is no arguments
                if (String(message.content.split(" ")) === `${prefix}server_say`) {
                    await message.delete();
                    let richEmbed = helpBox("server_say");
                    return message.channel.send(richEmbed);
                }
                let localArgs = messageArray.slice(2);
                let bot_embed = new Discord.RichEmbed()
                    .setColor(args[0])
                    .setThumbnail("https://cdn.discordapp.com/attachments/579769933219758148/605478475033346081/Icon.png")
                    .setDescription(localArgs.join(' '));
                await message.delete();
                return message.channel.send(bot_embed);
            } else {
                await message.delete();
                return message.channel.send(`${message.author} :negative_squared_cross_mark: You must have the `.concat("`", "kick_members, ban_members", "` permission to execute this command."));
            }
        } else {
            await message.delete();
            return message.channel.send(`${message.author} :negative_squared_cross_mark: You must have the `.concat("`", "kick_members, ban_members", "` permission to execute this command."));
        }
    }
    if (cmd === `${prefix}talk`) {
        if (message.member.hasPermission("KICK_MEMBERS")) {
            if (message.member.hasPermission("BAN_MEMBERS")) {
                // If there is no arguments
                if (String(message.content.split(" ")) === `${prefix}talk`) {
                    await message.delete();
                    let richEmbed = helpBox("talk");
                    return message.channel.send(richEmbed);
                }
                let localArgs = messageArray.slice(1);
                await message.delete();
                return message.channel.send(localArgs.join(' '));
            } else {
                await message.delete();
                return message.channel.send(`${message.author} :negative_squared_cross_mark: You must have the `.concat("`", "kick_members, ban_members", "` permission to execute this command."));
            }
        } else {
            await message.delete();
            return message.channel.send(`${message.author} :negative_squared_cross_mark: You must have the `.concat("`", "kick_members, ban_members", "` permission to execute this command."));
        }
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