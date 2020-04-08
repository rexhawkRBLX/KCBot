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

    for (let i = 0; i < arguments.length; i++) {
      console.log(arguments[i]);
      //Do something
    }
    if (String(args[0]).toLowerCase() === "ssu") {

    } else if (String(args[0]).toLowerCase() === "event") {
      message.channel.send("Hosting Event");
    } else {
      return await message.reply("Invalid event. Current available event types: \`ssu\`, \`event\`");
    }

    message.channel.send(`Complete`);
    console.log("Complete");

    return await message.reply(arguments.join(''));
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
