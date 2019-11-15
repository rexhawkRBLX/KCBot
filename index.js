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
   //
   //         return richEmbed;
   //     }else if (command === String("kick")) {
   //
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
   //
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
   //
   //
   //
   //
   //
   //
   //
   //
   //
  
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