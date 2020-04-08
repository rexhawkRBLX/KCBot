const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {



  let localArgs =  message.content.split(" ").slice(1).join(' ');

  if (String(message.content.split(" ")) === `${require("./../botconfig").prefix}host`) {
    await message.delete();
    let richEmbed = new Discord.RichEmbed()
        .setColor("#333333")
        .setTitle("**Command:** >host")
        .setDescription("**Description: **Host an event\n**Usage: **>host [event type] {[arguments]}\n**Example: **>host ssu {host:@Rexhawk} {msg:lets get active!}");
    return message.channel.send(richEmbed);
  } else {
    let brokenDownString = localArgs;

    let arguments =[];

    // Separate arguments into array
    do {
      if (brokenDownString.charAt(0) != "{") {
        brokenDownString = brokenDownString.substr(1);
      } else {
        let argument = ""
        brokenDownString = brokenDownString.substr(1);
        do {
          argument = argument + brokenDownString.charAt(0);
          brokenDownString = brokenDownString.substr(1);
        } while (brokenDownString.charAt(0) != "}");
        brokenDownString = brokenDownString.substr(1);
        arguments.push(argument);
      }
    } while (brokenDownString.length > 0);

    // Preset
    let eventType = 0;
    let eventName = 0;
    let eventHost = 0;
    let eventMessage = 0;
    let eventLink = 0;
    let eventDuration = 0;
    let eventChannel = 0;
    let pingRole = 0;

    if (String(args[0]).toLowerCase() === "ssu" || String(args[0]).toLowerCase() === "event") {
      eventType = String(args[0]).toLowerCase()
    } else {
      return await message.reply("Invalid event. Current available event types: \`ssu\`, \`event\`");
    }

    for (let i = 0; i < arguments.length; i++) {
      let localArguments = String(arguments[i]).split(":");
      if (String(localArguments[0]).toLowerCase() === "name") {
        eventName = String(localArguments[1]);
      } else if (String(localArguments[0]).toLowerCase() === "host") {
        eventHost = String(localArguments[1]);
      } else if (String(localArguments[0]).toLowerCase() === "message") {
        eventMessage = String(localArguments[1]);
      } else if (String(localArguments[0]).toLowerCase() === "link") {
        eventLink = String(localArguments[1]);
      } else if (String(localArguments[0]).toLowerCase() === "duration") {
        eventDuration = String(localArguments[1]);
      } else if (String(localArguments[0]).toLowerCase() === "channel") {
        let channelID = message.guild.channels.find(channel => channel.name === String(localArguments[1]));
        if (channelID.id != null) {
          eventChannel = channelID.id
        } else {
          return await message.reply("Invalid channel parameter. Make sure to type the whole name (case-sensitive)");
        }
      } else if (String(localArguments[0]).toLowerCase() === "role") {
        let roleID = message.guild.roles.find("name", String(localArguments[1]));

        if (roleID.id != null) {
          pingRole = roleID.id
        } else {
          return await message.reply("Invalid role parameter. Make sure to type the whole name (case-sensitive)");
        }
      }
    }

    if (eventName === 0) {
      if (eventType === "ssu") {
        eventName = `Server Start Up!`;
      } else if (eventType === "event") {
        eventName = `Game Event!`;
      }
    }
    if (eventHost === 0) {
      eventHost = String(message.member.user.tag);
    }
    if (eventMessage === 0) {
      if (eventType === "ssu") {
        eventMessage = `*Remember to follow the rules and have fun.*`;
      } else if (eventType === "event") {
        eventMessage = `*Remember to follow the rules to make the game fun for everybody.*`;
      }
    }
    if (eventLink === 0) {
      eventLink = "https://www.roblox.com/games/4240465985/King-City-California";
    }
    if (eventDuration === 0) {
      eventDuration = ""
    } else {
      eventDuration = `**Event Duration:** ${eventDuration}\n`
    }
    if (eventChannel === 0) {
      eventChannel = "636379801829244932";
    }
    if (pingRole === 0) {
      pingRole = "Role here"
    }

    if (String(message.guild.id) != "621475864546115611") {
      return await message.reply("This command can only be run in the King City server.")
    }

    // Compile Message
    let compiledMessage = `<@&${String(pingRole)}>   **${eventName}**\n\n**This ${eventType} is hosted by: **${eventHost}\n${eventDuration}**Game Link: **${eventLink}\n\n${eventMessage}`;


    message.channel.send(`Complete`);
    console.log("Complete");

    return await bot.channels.get(eventChannel).send(compiledMessage);
  }

  /*
    if(message.member.roles.find(r => r.name === "Administrative Services") || message.member.roles.find(r => r.name === "Cabinet") || message.member.roles.find(r => r.name === "Department Command") ||message.member.roles.find(r => r.name === "Mayor") || message.member.roles.find(r => r.name === "Assistant Mayor")){
        if (String(message.guild.id) === "621475864546115611") {
            await message.delete();
            return await bot.channels.get("636379801829244932").send(`<@&636656216587632640> **Server Startup!**\n**This Server Startup is hosted by: **${message.member}\n\n**Game Link:** https://www.roblox.com/games/4240465985/King-City-California\n\n*Remember to follow the rules and have fun.*`);
        } else {
            await message.delete();
            return message.reply(`**ERROR**: \`Incorrect Server\``);
        }
    } else {
        await message.delete();
        return message.reply(`**ERROR**: \`Incorrect Permissions\``);
    } */

    //return await message.reply(localArgs);
};

module.exports.help = {
    name: "host"
};
