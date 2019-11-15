const http = require("http");

const bot_config = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const PORT = process.env.PORT || 3000;
const app = require("express")();
const bot = new Discord.Client({disableEveryone: true});
const version = "v".concat("1.1.15");
const prefix = bot_config.prefix;
let activity = "King City, California";
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) =>{
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0){
        return console.log("Couldnt find commands.");
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

bot.on("ready", async() => {

    bot.channels.get('622224689309155338').send(`KC Bot is online back online running on port \`${PORT}\``);
    // Set Activity
    // function setActivity() {
    //     setInterval(function () {
    //         if (activity === "King City, California") {
    //             bot.user.setActivity("King City, California", {type: "PLAYING"});
    //             activity = "KC, California | >help";
    //         } else if (activity === "KC, California | >help") {
    //             bot.user.setActivity("KC, California | >help", {type: "PLAYING"});
    //             activity = "King City, California";
    //         }
    //     }, 15000); // every 15 seconds
    // }
    // setActivity(); // Set activity to bot
    await bot.user.setActivity("Undergoing some serious changes", {type: "PLAYING"});
});

bot.on("message", async message => {
   if (message.author.bot) return;
   if (message.channel.type === "dm") return;
   let messageArray = message.content.split(" ");
   let cmd = messageArray[0].toLowerCase();
   let args = messageArray.slice(1);
   // Functions
   let commandFile = bot.commands.get(cmd.slice(prefix.length));
   if (commandFile) await commandFile.run(bot,message,args);

   // function helpBox (command){
   //    if (command === String("report")){
   //         let richEmbed = new Discord.RichEmbed()
   //             .setColor("#333333")
   //             .setTitle("**Command:** >report")
   //             .setFooter("Abuse of this command will result in administrative action.");
   //         let array = ["**Description: **Report a member for later moderation", "**Usage: **>report [user] [reason]", "**Example: **>report @rexhawk being too beautiful!"];
   //         richEmbed.setDescription(array.join('\n'));
   //         return richEmbed;
   //     } else if (command === String("ban")) {
   //         let richEmbed = new Discord.RichEmbed()
   //             .setColor("#333333")
   //             .setTitle("**Command:** >ban");
   //         let array = ["**Description: **Ban a member from the server", "**Usage: **>ban [user] [reason]", "**Example: **>ban @rexhawk being too beautiful!"];
   //         richEmbed.setDescription(array.join('\n'));
   //         return richEmbed;
   //     }else if (command === String("kick")) {
   //         let richEmbed = new Discord.RichEmbed()
   //             .setColor("#333333")
   //             .setTitle("**Command:** >kick");
   //         let array = ["**Description: **Kick a member from the server", "**Usage: **>kick [user] [reason]", "**Example: **>kick @rexhawk being too beautiful!"];
   //         richEmbed.setDescription(array.join('\n'));
   //         return richEmbed;
   //     }else if (command === String("say")) {
   //         let richEmbed = new Discord.RichEmbed()
   //             .setColor("#333333")
   //             .setTitle("**Command:** >say");
   //         let array = ["**Description: **Make KCBot say message inside of rich embed", "**Usage: **>say [COLOR] [message]", "**Example: **>say RED rexhawk is too beautiful!"];
   //         richEmbed.setDescription(array.join('\n'));
   //         return richEmbed;
   //     }else if (command === String("server_say")) {
   //         let richEmbed = new Discord.RichEmbed()
   //             .setColor("#333333")
   //             .setTitle("**Command:** >server_say");
   //         let array = ["**Description: **Make KCBot say message inside of rich embed with CHP's logo", "**Usage: **>server_say [COLOR] [message]", "**Example: **>say RED rexhawk is too beautiful!"];
   //         richEmbed.setDescription(array.join('\n'));
   //         return richEmbed;
   //     }else if (command === String("talk")) {
   //             let richEmbed = new Discord.RichEmbed()
   //                 .setColor("#333333")
   //                 .setTitle("**Command:** >talk");
   //             let array = ["**Description: **Make KCBot say message", "**Usage: **>talk [message]", "**Example: **>talk rexhawk is too beautiful!"];
   //             richEmbed.setDescription(array.join('\n'));
   //             return richEmbed;
   //     }else if (command === String("prune")) {
   //         let richEmbed = new Discord.RichEmbed()
   //             .setColor("#333333")
   //             .setTitle("**Command:** >prune");
   //         let array = ["**Description: **Delete a set number of messages", "**Usage: **>prune [amount]", "**Example: **>prune 50"];
   //         richEmbed.setDescription(array.join('\n'));
   //         return richEmbed;
   //     }else if (command === String("prune")) {
   //        let richEmbed = new Discord.RichEmbed()
   //            .setColor("#333333")
   //            .setTitle("**Command:** >prune");
   //        let array = ["**Description: **Delete a set number of messages", "**Usage: **>prune [amount]", "**Example: **>prune 50"];
   //        richEmbed.setDescription(array.join('\n'));
   //        return richEmbed;
   //    }else if (command === String("invites")) {
   //        let richEmbed = new Discord.RichEmbed()
   //            .setColor("#333333")
   //            .setTitle("**Command:** >invites");
   //        let array = ["**Description: **Return a leaderboard of the most used invites", "**Usage: **>invites", "**Example: **>invites"];
   //        richEmbed.setDescription(array.join('\n'));
   //        return richEmbed
   //    }
   // }
   //
   //
   // // Commands
   //
   //
   //  if (cmd === `${prefix}help`){
   //      let pmEmbed = new Discord.RichEmbed()
   //          .setAuthor("KCBot Commands",bot.user.avatarURL,"https://www.roblox.com/groups/5210085/King-City-California")
   //          .setColor("#689FF5")
   //          .addField("Bot Maintenance","**>restart**: Reboots the bot client to reset errors. \`Administrator\`\n**>shutdown**: Shuts down the bot client. (requires manual reboot) \`Administrator\`\n**>version**: Returns the current bot version. \`Everyone\`\n**>botinfo**: Returns more detailed information about KCBot. \`Everyone\`\n", true)
   //          .addField("Moderation","**>ban**: Bans the specified player. \`Ban Permission\`\n**>kick**: Kicks the specified player. \`Kick Permission\`\n**>prune**: Bulk deletes the specified amount of messages. \`Manage Messages Permission\`\n**>report**: Reports the specified player for later moderation and punishment. \`Everyone\`\n", true)
   //          .addField("Fun","**>ssu**: Announces a server start up. \`Mange Messages Permission\`\n**>info**: Returns a list of current discord invites and group links. \`Everyone\`\n**>invites**: Returns a leaderboard of the most used invites \'Everyone\'\n**>serverinfo**: Returns more detailed information about the current server \`Everyone\`\n**>serverphoto**: Returns the current server's photo \`Everyone\`\n**>say**: Uses the bot to repeat message inside of RichEmbed with specified color. \`Manage Messages Permission\`\n**>talk**: Uses the bot to repeat message \`Manage Messages Permission\`\n**>help**: Causes the bot to DM a list of commands \`Everyone\`\n")
   //          .setFooter("For additional information, DM the bot's creator: rexhawk#0132");
   //      let waitMsg = await message.channel.send("Working...");
   //      await message.author.send(pmEmbed);
   //      return await waitMsg.edit(`${message.author} :white_check_mark: Complete! Check your DMs!`);
   //  }
   //
   //
   //
   // // Restart
   //  if (cmd === `${prefix}restart`){
   //       if (message.member.hasPermission("ADMINISTRATOR")){
   //             message.channel.send(`${message.author} :white_check_mark: Initiating \`restart\` process...`)
   //                 .then(msg => bot.destroy())
   //                 .then(() => bot.login(process.env.token));
   //             await message.delete();
   //             return
   //       } else{
   //           await message.delete();
   //           return message.reply(`**ERROR**: You must have the \`ADMINISTRATOR\` permission to execute this command.`);
   //       }
   //  }
   //
   //  // Info
   //  if (cmd === `${prefix}info`){
   //      let rich_Embed = new Discord.RichEmbed()
   //          .setAuthor("Game Information",bot.user.avatarURL,"https://www.roblox.com/groups/5210085/King-City-California")
   //          .setThumbnail("https://cdn.discordapp.com/attachments/622223331915202560/622551240626143232/King_City_CA.png")
   //          .setFooter("Additional Information can be found in the #information channel of the King City server.")
   //          .setColor("#689ff5")
   //          .addField("King City Groups", `[King City, California](https://www.roblox.com/groups/5210085/King-City-California)\n[California Highway Patrol](https://www.roblox.com/groups/4876110/California-Highway-Patrol-Coastal-Division)\n[King City Police Department](https://www.roblox.com/groups/4897046/King-City-Police-Department)\n[King City Fire Department](https://www.roblox.com/groups/4898855/King-City-Fire-Department)\n[King City DoPW](https://www.roblox.com/groups/5232362/King-City-Department-of-Public-Works)`,true)
   //          .addField("Discord Servers",`[King City, California](https://discord.gg/dVtCgDh)\n[California Highway Patrol](https://discord.gg/HWn7hUg)\n[King City Police Department](https://discord.gg/YM5hDfk)\n[King City Fire Department](https://discord.gg/bDjdfbB)\n[King City DoPW](https://discord.gg/bBh4mrK)`, true)
   //          .addBlankField()
   //          .addField("King City Game",`[King City, California](https://www.roblox.com/games/3571375889/King-City-California)`);
   //      return message.reply(rich_Embed);
   //  }
   //
   //  // Shutdown
   //  if (cmd === `${prefix}shutdown`){
   //      if (message.member.hasPermission("ADMINISTRATOR")){
   //          await message.reply(`:white_check_mark: Initiating \`shutdown\` process...`);
   //          await bot.destroy();
   //          return
   //      } else{
   //          await message.delete();
   //          return message.reply(`**ERROR**: You must have the \`ADMINISTRATOR\` permission to execute this command.`);
   //      }
   //  }
   //
   //  // Ban
   //  if (cmd === `${prefix}ban`){
   //     if (message.member.hasPermission("BAN_MEMBERS")){
   //         const arguments = message.content.split(' ').slice(1);
   //         const member_user = message.mentions.users.first();
   //         const banReason = arguments.slice(1).join(' ');
   //         let member = message.mentions.members.first();
   //
   //         // If there is no arguments
   //         if (String(message.content.split(" ")) === `${prefix}ban`) {
   //             await message.delete();
   //             let richEmbed = helpBox("ban");
   //             return message.channel.send(richEmbed);
   //         }
   //
   //         if (!member) {
   //             try {
   //                 if (!message.guild.members.get(arguments.slice(0, 1).join(' '))) await message.reply(`**ERROR**: \`user not found\``);
   //                 member = message.guild.members.get(arguments.slice(0, 1).join(' '));
   //                 member = member.user;
   //             } catch (error) {
   //                 return await message.reply(`**ERROR**: \`user not found\``);
   //             }
   //         }
   //         if (member === message.author) return message.reply(`**ERROR**: \`you cannot ban yourself.\``);
   //         if (!banReason) return message.reply(`**ERROR**: \`invalid reason\``);
   //         if (!message.guild.member(member).bannable) return message.reply("**ERROR**: \`insufficient permissions\`");
   //
   //         await member.send(`You have been banned from \`${message.guild.name}\` for the following reason(s): \`${banReason}\``);
   //         await member.ban(banReason);
   //
   //         const banConfirmationEmbed = new Discord.RichEmbed()
   //             .setColor('#f54242')
   //             .setDescription(`:white_check_mark: \`${member_user.tag}\` has been successfully banned`);
   //         await message.channel.send(banConfirmationEmbed);
   //
   //         if (getServer(message,"log").length !== 0) {
   //             if (!getServer(message,"log")) return undefined;
   //             let banConfirmationEmbedModlog = new Discord.RichEmbed()
   //                 .setAuthor(`Banned by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
   //                 .setThumbnail(member_user.displayAvatarURL)
   //                 .setColor('#f54242')
   //                 .setTimestamp(message.createdAt)
   //                 .setDescription(`**Action**: Ban\n**User**: ${member_user.username}#${member_user.discriminator} (${member_user.id})\n**Reason**: ${banReason}`);
   //             bot.channels.get(getServer(message,"log")).send(banConfirmationEmbedModlog);
   //         }
   //         await message.delete();
   //     } else{
   //         await message.delete();
   //         return message.reply(`**ERROR**: \`permission(s): ban_members\` needed`);
   //     }
   //  }
   //  // Kick
   //  if (cmd === `${prefix}kick`){
   //      if (message.member.hasPermission("KICK_MEMBERS")){
   //          const arguments = message.content.split(' ').slice(1);
   //          const member_user = message.mentions.users.first();
   //          const kickReason = arguments.slice(1).join(' ');
   //          let member = message.mentions.members.first();
   //
   //          // If there is no arguments
   //          if (String(message.content.split(" ")) === `${prefix}kick`) {
   //              await message.delete();
   //              let richEmbed = helpBox("kick");
   //              return message.channel.send(richEmbed);
   //          }
   //
   //          if (!member) {
   //              try {
   //                  if (!message.guild.members.get(arguments.slice(0, 1).join(' '))) await message.reply(`**ERROR**: \`user not found\``);
   //                  member = message.guild.members.get(arguments.slice(0, 1).join(' '));
   //                  member = member.user;
   //              } catch (error) {
   //                  return await message.reply(`**ERROR**: \`user not found\``);
   //              }
   //          }
   //          if (member === message.author) return message.reply(`**ERROR**: \`you cannot kick yourself.\``);
   //          if (!kickReason) return message.reply(`**ERROR**: \`invalid reason\``);
   //          if (!message.guild.member(member).bannable) return message.reply(`**ERROR**: \`sufficient permissions\``);
   //
   //          await member.send(`You have been kicked from \`${message.guild.name}\` for the following reason(s): \`${kickReason}\`. You may rejoin with this [link](${getServer(message,"invite")})`);
   //          await member.kick(kickReason);
   //
   //          const kickConfirmationEmbed = new Discord.RichEmbed()
   //              .setColor('#f54242')
   //              .setDescription(`:white_check_mark: \`${member_user.tag}\` has been successfully kicked`);
   //          await message.channel.send(kickConfirmationEmbed);
   //
   //          if (getServer(message,"log").length !== 0) {
   //              if (!getServer(message,"log")) return undefined;
   //              let kickConfirmationEmbedModlog = new Discord.RichEmbed()
   //                  .setAuthor(`Kicked by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
   //                  .setThumbnail(member_user.displayAvatarURL)
   //                  .setColor('#f54242')
   //                  .setTimestamp(message.createdAt)
   //                  .setDescription(`**Action**: Kick\n**User**: ${member_user.username}#${member_user.discriminator} (${member_user.id})\n**Reason**: ${kickReason}`);
   //              bot.channels.get(getServer(message,"log")).send(kickConfirmationEmbedModlog);
   //          }
   //          await message.delete();
   //      } else{
   //          await message.delete();
   //          return message.reply(`**ERROR**: \`permission(s): KICK_MEMBERS\` needed`);
   //      }
   //  }
   //
   // // Report
   // if (cmd === `${prefix}report`){
   //
   // }
   //
   // // Prune
   // if (cmd === `${prefix}prune`){
   //      if (message.member.hasPermission("MANAGE_MESSAGES")) {
   //          // If there is no arguments
   //          if (String(message.content.split(" ")) === `${prefix}prune`) {
   //              await message.delete();
   //              let richEmbed = helpBox("prune");
   //              return message.channel.send(richEmbed);
   //          }
   //          if (isNaN(args[0])) return message.reply(`**ERROR**: Invalid amount. Please supply a number between \`1\` and \`100\``);
   //          if (Number(args[0]) > 100) return message.reply(`**ERROR**: Invalid amount. Please supply a number between \`1\` and \`100\``);
   //          await message.delete();
   //          message.channel.bulkDelete(args[0])
   //              .catch( error => message.channel.send(`**ERROR**: \`${error.message}\``));
   //      }else{
   //          await message.delete();
   //          return message.reply(`**ERROR**: \`permission(s): MANAGE_MESSAGES\` needed`);
   //      }
   // }
   //
   // // Version
   // if (cmd === `${prefix}version`){
   //      return message.channel.send(`\`${version}\``);
   // }
   //
   // // Server Info
   // if (cmd === `${prefix}serverinfo`){
   //     let dateformat = [message.guild.createdAt.getMonth()+1,
   //         message.guild.createdAt.getDate(),
   //         message.guild.createdAt.getFullYear()].join('/');
   //     let server_embed = new Discord.RichEmbed()
   //         .addField("Server Owner",message.guild.owner.user.tag,true)
   //         .addField("Humans",message.guild.members.filter(member => !member.user.bot).size,true)
   //         .addField("Bots",message.guild.members.filter(member => member.user.bot).size,true)
   //         .addField("Total members",message.guild.memberCount,true)
   //         .addField("Text Channels",message.guild.channels.size,true)
   //         .addField("Roles",message.guild.roles.size,true)
   //         .setFooter(`${message.guild.id} • Created on ${dateformat}`)
   //         .setColor("#689FF5")
   //         .setAuthor(message.guild.name,bot.user.avatarURL);
   //     await message.delete();
   //     return message.channel.send(server_embed);
   // }
   //
   //  // Bot Info
   //  if (cmd === `${prefix}botinfo`){
   //      let dateformat = [bot.user.createdAt.getMonth()+1,
   //          bot.user.createdAt.getDate(),
   //          bot.user.createdAt.getFullYear()].join('/');
   //      let bot_embed = new Discord.RichEmbed()
   //          .setAuthor(bot.user.tag,bot.user.avatarURL)
   //          .addField("Bot Name", bot.user.username,true)
   //          .addField("Created on", `${dateformat}`,true)
   //          .addField("Number of commands","13",true)
   //          .setFooter(`${bot.user.id} • by rexhawk#0132`)
   //          .setColor("#689FF5");
   //      await message.delete();
   //      return message.channel.send(bot_embed);
   //  }
   //
   //  // Say
   //  if (cmd === `${prefix}say`){
   //      let localArgs = messageArray.slice(2);
   //      if (message.member.hasPermission("MANAGE_MESSAGES"))  {
   //          // If there is no arguments
   //          if (String(message.content.split(" ")) === `${prefix}say`) {
   //              await message.delete();
   //              let richEmbed = helpBox("say");
   //              return message.channel.send(richEmbed);
   //          }else {
   //              let bot_embed = new Discord.RichEmbed()
   //                  .setColor(args[0].toUpperCase())
   //                  .setDescription(localArgs.join(' '));
   //              await message.delete();
   //              return message.channel.send(bot_embed);
   //          }
   //      } else {
   //          await message.delete();
   //          return message.reply(`**ERROR**: \`permission(s): MANAGE_MESSAGES\` needed`);
   //      }
   //  }
   //
   //  if (cmd === `${prefix}talk`){
   //      let localArgs = messageArray.slice(1);
   //      if (message.member.hasPermission("MANAGE_MESSAGES"))  {
   //          // If there is no arguments
   //          if (String(message.content.split(" ")) === `${prefix}talk`) {
   //              await message.delete();
   //              let richEmbed = helpBox("talk");
   //              return message.channel.send(richEmbed);
   //          }else {
   //              await message.delete();
   //              return await message.channel.send(localArgs.join(' '));
   //          }
   //      } else {
   //          await message.delete();
   //          return message.reply(`**ERROR**: \`permission(s): MANAGE_MESSAGES\` needed`);
   //      }
   //  }
   //
   //  if (cmd === `${prefix}serverphoto`) {
   //      return message.reply(`${message.guild.iconURL}`)
   //  }
   //
   //  if (cmd === `${prefix}ssu`){
   //      if(message.member.roles.find(r => r.name === "Administrative Services") || message.member.roles.find(r => r.name === "Cabinet") || message.member.roles.find(r => r.name === "Mayor") || message.member.roles.find(r => r.name === "Assistant Mayor")){
   //          if (String(message.guild.id) === "621475864546115611") {
   //              await message.delete();
   //              return await bot.channels.get("636379801829244932").send(`<@&636656216587632640> **Server Startup!**\n**This Server Startup is hosted by: **${message.member}\n\n**Game Link:** https://www.roblox.com/games/3571375889/King-City-California\n\n*Remember to follow the rules and have fun.*`);
   //          } else {
   //              await message.delete();
   //              return message.reply(`**ERROR**: \`Incorrect Server\``);
   //          }
   //      } else {
   //          await message.delete();
   //          return message.reply(`**ERROR**: \`Incorrect Permissions\``);
   //      }
   //  }
   //
   //  if (cmd === `${prefix}serverphoto`) {
   //      return message.reply(`${message.guild.iconURL}`)
   //  }
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


bot.login(process.env.token).catch(err => console.log(err));