const http = require("http");

const bot_config = require("./botconfig.json");
const Discord = require("discord.js");
const PORT = process.env.PORT || 3000;
const app = require("express")();
const bot = new Discord.Client({disableEveryone: true});
const roblox = require('noblox.js');
const version = "v".concat("1.1.12");
const prefix = bot_config.prefix;

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

bot.on("ready", async() => {
    bot.channels.get('592492329257140234').send(`KC Bot is online back online running on port \`${PORT}\``);
});

bot.on("message", async message => {
   if (message.author.bot) return;
   if (message.channel.type === "dm") return;
   let messageArray = message.content.split(" ");
   let cmd = messageArray[0].toLowerCase();
   let args = messageArray.slice(1);
   // Functions
   function getServer(message,type){
       if (type === "report") {
           if (message.guild.id === "621475864546115611") {
               return "631668484073455645";
           } else if (message.guild.id === "569636982528016425") {
               return "630934304393920512";
           }
       } else if (type === "log") {
           if (message.guild.id === "621475864546115611") {
               return "622224689309155338";
           } else if (message.guild.id === "569636982528016425") {
               return "592492329257140234";
           }
       }  else if (type === "invite") {
           if (message.guild.id === "621475864546115611") {
               return "https://discord.gg/dVtCgDh";
           } else if (message.guild.id === "569636982528016425") {
               return "https://discord.gg/syXRhgh";
           }
       }
   }
   function helpBox (command){
      if (command === String("report")){
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
       }else if (command === String("prune")) {
           let richEmbed = new Discord.RichEmbed()
               .setColor("#333333")
               .setTitle("**Command:** >prune");
           let array = ["**Description: **Delete a set number of messages", "**Usage: **>prune [amount]", "**Example: **>prune 50"];
           richEmbed.setDescription(array.join('\n'));
           return richEmbed;
       }
   }


   // Commands


   // Restart
    if (cmd === `${prefix}restart`){
         if (message.member.hasPermission("ADMINISTRATOR")){
               message.channel.send(`${message.author} :white_check_mark: Initiating \`restart\` process...`)
                   .then(msg => bot.destroy())
                   .then(() => bot.login(process.env.token));
               await message.delete();
               return
         } else{
             await message.delete();
             return message.reply(`:negative_squared_cross_mark: You must have the \`Administrator\` permission to execute this command.`);
         }
    }

    // Info
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

    // Shutdown
    if (cmd === `${prefix}shutdown`){
        if (message.member.hasPermission("ADMINISTRATOR")){
            await message.reply(`:white_check_mark: Initiating \`shutdown\` process...`);
            await bot.destroy();
            return
        } else{
            await message.delete();
            return message.reply(`:negative_squared_cross_mark: You must have the \`Administrator\` permission to execute this command.`);
        }
    }

    // Ban
    if (cmd === `${prefix}ban`){
       if (message.member.hasPermission("BAN_MEMBERS")){
           const arguments = message.content.split(' ').slice(1);
           const member_user = message.mentions.users.first();
           const banReason = arguments.slice(1).join(' ');
           let member = message.mentions.members.first();

           // If there is no arguments
           if (String(message.content.split(" ")) === `${prefix}ban`) {
               await message.delete();
               let richEmbed = helpBox("ban");
               return message.channel.send(richEmbed);
           }

           if (!member) {
               try {
                   if (!message.guild.members.get(arguments.slice(0, 1).join(' '))) await message.reply(":negative_squared_cross_mark: error: \`user not found\`");
                   member = message.guild.members.get(arguments.slice(0, 1).join(' '));
                   member = member.user;
               } catch (error) {
                   return await message.reply(":negative_squared_cross_mark: error: \`user not found\`");
               }
           }
           if (member === message.author) return message.reply(":negative_squared_cross_mark: error: \`you cannot ban yourself.\`");
           if (!banReason) return message.reply(':negative_squared_cross_mark: error: \`invalid reason\`');
           if (!message.guild.member(member).bannable) return message.reply(":negative_squared_cross_mark: error: \`sufficient permissions\`");

           await member.send(`You have been banned from ${message.guild.name} for the following reason(s): ${banReason}`);
           await member.ban(banReason);

           const banConfirmationEmbed = new Discord.RichEmbed()
               .setColor('#f54242')
               .setDescription(`:white_check_mark: \`${member_user.tag}\` has been successfully banned`);
           await message.channel.send(banConfirmationEmbed);

           if (getServer(message,"log").length !== 0) {
               if (!getServer(message,"log")) return undefined;
               let banConfirmationEmbedModlog = new Discord.RichEmbed()
                   .setAuthor(`Banned by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
                   .setThumbnail(member_user.displayAvatarURL)
                   .setColor('#f54242')
                   .setTimestamp(message.createdAt)
                   .setDescription(`**Action**: Ban\n**User**: ${member_user.username}#${member_user.discriminator} (${member_user.id})\n**Reason**: ${banReason}`);
               bot.channels.get(getServer(message,"log")).send(banConfirmationEmbedModlog);
           }
           await message.delete();
       } else{
           await message.delete();
           return message.reply(`:negative_squared_cross_mark: error: \`permission(s): ban_members needed\``);
       }
    }

    // Kick
    if (cmd === `${prefix}kick`){
        if (message.member.hasPermission("KICK_MEMBERS")){
            const arguments = message.content.split(' ').slice(1);
            const member_user = message.mentions.users.first();
            const kickReason = arguments.slice(1).join(' ');
            let member = message.mentions.members.first();

            // If there is no arguments
            if (String(message.content.split(" ")) === `${prefix}kick`) {
                await message.delete();
                let richEmbed = helpBox("kick");
                return message.channel.send(richEmbed);
            }

            if (!member) {
                try {
                    if (!message.guild.members.get(arguments.slice(0, 1).join(' '))) await message.reply(":negative_squared_cross_mark: error: \`user not found\`");
                    member = message.guild.members.get(arguments.slice(0, 1).join(' '));
                    member = member.user;
                } catch (error) {
                    return await message.reply(":negative_squared_cross_mark: error: \`user not found\`");
                }
            }
            if (member === message.author) return message.reply(":negative_squared_cross_mark: error: \`you cannot kick yourself.\`");
            if (!kickReason) return message.reply(':negative_squared_cross_mark: error: \`invalid reason\`');
            if (!message.guild.member(member).bannable) return message.reply(":negative_squared_cross_mark: error: \`sufficient permissions\`");

            await member.send(`You have been kicked from ${message.guild.name} for the following reason(s): ${kickReason}. You may rejoin with this [link](${getServer(message,"invite")})`);
            await member.kick(kickReason);

            const kickConfirmationEmbed = new Discord.RichEmbed()
                .setColor('#f54242')
                .setDescription(`:white_check_mark: \`${member_user.tag}\` has been successfully kicked`);
            await message.channel.send(kickConfirmationEmbed);

            if (getServer(message,"log").length !== 0) {
                if (!getServer(message,"log")) return undefined;
                let kickConfirmationEmbedModlog = new Discord.RichEmbed()
                    .setAuthor(`Banned by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
                    .setThumbnail(member_user.displayAvatarURL)
                    .setColor('#f54242')
                    .setTimestamp(message.createdAt)
                    .setDescription(`**Action**: Kick\n**User**: ${member_user.username}#${member_user.discriminator} (${member_user.id})\n**Reason**: ${kickReason}`);
                bot.channels.get(getServer(message,"log")).send(kickConfirmationEmbedModlog);
            }
            await message.delete();
        } else{
            await message.delete();
            return message.reply(`:negative_squared_cross_mark: error: \`permission(s): kick_members needed\``);
        }
    }

   // Report
   if (cmd === `${prefix}report`){
       let reported_User = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
       let reason = args.join(" ").slice(22);

       // If there is no arguments
       if (String(message.content.split(" ")) === `${prefix}report`) {
           await message.delete();
           let richEmbed = helpBox("report");
           return message.channel.send(richEmbed);
       }

       if (!reported_User) return message.channel.send(`:negative_squared_cross_mark: error: \`user not found\` `);

       let reportEmbed = new Discord.RichEmbed()
           .setColor("#f54242")
           .setAuthor(message.author.tag,message.author.avatarURL)
           .setDescription(`Reporting ${reported_User}[Jump to report](${message.url})\n`)
           .addField("Reason","`".concat(reason,"`"))
           .setTimestamp(message.createdAt);
       await message.delete();
       await bot.channels.get(getServer(message)).send(reportEmbed);
       return message.channel.send(`:white_check_mark: Successfully reported ${String(reported_User)} for \`${reason}\`.`);
   }

   // Prune
   if (cmd === `${prefix}prune`){
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            // If there is no arguments
            if (String(message.content.split(" ")) === `${prefix}prune`) {
                await message.delete();
                let richEmbed = helpBox("prune");
                return message.channel.send(richEmbed);
            }
            if (isNaN(args[0])) return message.reply(`:negative_squared_cross_mark: Invalid amount. Please supply a number between \`1\` and \`100\``);
            if (Number(args[0]) > 100) return message.reply(`:negative_squared_cross_mark: Invalid amount. Please supply a number between \`1\` and \`100\``);
            await message.delete();
            message.channel.bulkDelete(args[0])
                .catch( error => message.channel.send(`Error: \`${error.message}\``));
        }else{
            await message.delete();
            return message.reply(`:negative_squared_cross_mark: error: \`permission(s): manage_messages needed\``);
        }
   }

   // Version
   if (cmd === `${prefix}version`){
        return message.channel.send(`\`${version}\``);
   }

   // Server Info
   if (cmd === `${prefix}serverinfo`){
       let server_embed = new Discord.RichEmbed()
           .addField("Server Owner",message.guild.ownerID,true)
           .addField("Humans",message.guild.members.filter(member => !member.user.bot).size,true)
           .addField("Bots",message.guild.members.filter(member => member.user.bot).size,true)
           .addField("Text Channels",message.guild.channels.size,true)
           .addField("Text Channels",message.guild.roles.size,true)
           .addField("Amount of members",message.guild.memberCount)
           .addField("Creation date",message.guild.createdAt.getDate(),true)
           .setColor("#689FF5")
           .setAuthor(message.guild.name,bot.user.avatarURL)
       await message.delete();
       return message.channel.send(server_embed);
   }

    // Bot Info
    if (cmd === `${prefix}bot_info`){
        let bot_embed = new Discord.RichEmbed()
            .setTitle("Bot Information")

            .setAuthor(bot.user.tag,bot.user.avatarURL)
            .addField("Bot Name", bot.user.username)
            .addField("Created on", `${bot.user.createdAt.getDate()} by rexhawk 2019`);
        await message.delete();
        return message.channel.send(bot_embed);
    }

    // Say
    if (cmd === `${prefix}say`){
        let localArgs = messageArray.slice(2);
        if (message.member.hasPermission("KICK_MEMBERS")) {
            if (message.member.hasPermission("BAN_MEMBERS")) {
                // If there is no arguments
                if (String(message.content.split(" ")) === `${prefix}say`) {
                    await message.delete();
                    let richEmbed = helpBox("say");
                    return message.channel.send(richEmbed);
                let bot_embed = new Discord.RichEmbed()
                    .setColor(args[0])
                    .setDescription(localArgs.join(' '));
                await message.delete();
                return message.channel.send(bot_embed);
            }else {
                await message.delete();
                return message.reply(`:negative_squared_cross_mark: error: \`permission(s): kick_members, ban_members needed\``);
            }
        }else {
            await message.delete();
            return message.reply(`:negative_squared_cross_mark: error: \`permission(s): kick_members, ban_members needed\``);
        }
    }

    // Server Say
    if (cmd === `${prefix}server_say`) {
        let localArgs = messageArray.slice(2);
        if (message.member.hasPermission("KICK_MEMBERS")) {
            if (message.member.hasPermission("BAN_MEMBERS")) {
                // If there is no arguments
                if (String(message.content.split(" ")) === `${prefix}server_say`) {
                    await message.delete();
                    let richEmbed = helpBox("server_say");
                    return message.channel.send(richEmbed);
                }
                let bot_embed = new Discord.RichEmbed()
                    .setColor(args[0])
                    .setThumbnail("https://cdn.discordapp.com/attachments/579769933219758148/605478475033346081/Icon.png")
                    .setDescription(localArgs.join(' '));
                await message.delete();
                return message.channel.send(bot_embed);
            } else {
                await message.delete();
                return message.reply(`:negative_squared_cross_mark: error: \`permission(s): kick_members, ban_members needed\``);
            }
        } else {
            await message.delete();
            return message.reply(`:negative_squared_cross_mark: error: \`permission(s): kick_members, ban_members needed\``);
        }
    }
    if (cmd === `${prefix}talk`) {
        let localArgs = messageArray.slice(1);
        if (message.member.hasPermission("KICK_MEMBERS")) {
            if (message.member.hasPermission("BAN_MEMBERS")) {
                // If there is no arguments
                if (String(message.content.split(" ")) === `${prefix}talk`) {
                    await message.delete();
                    let richEmbed = helpBox("talk");
                    return message.channel.send(richEmbed);
                }
                await message.delete();
                return message.channel.send(localArgs.join(' '));
            } else {
                await message.delete();
                return message.reply(`:negative_squared_cross_mark: error: \`permission(s): kick_members, ban_members needed\``);
            }
        } else {
            await message.delete();
            return message.reply(`:negative_squared_cross_mark: error: \`permission(s): kick_members, ban_members needed\``);
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
// Set Activity
function setActivity() {
    setInterval(function () {
        let actions = ["King City, California", "KC, California | >help"];
        bot.user.setActivity(actions[Math.floor(actions.length * Math.random())], {type: "PLAYING"});
    }, 30); // every 30 seconds
}


startKeepAlive(); // Keep from idling
setActivity(); // Set activity to bot

bot.login(process.env.token).catch(err => console.log(err));