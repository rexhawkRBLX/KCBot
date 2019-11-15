const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let localArgs = message.content.split(" ").slice(2);
    if (message.member.hasPermission("MANAGE_MESSAGES"))  {
        // If there is no arguments
        if (String(message.content.split(" ")) === `${require("./../botconfig").prefix}say`) {
            await message.delete();
            let richEmbed = new Discord.RichEmbed()
                .setColor("#333333")
                .setTitle("**Command:** >say")
                .setDescription("**Description: **Make KCBot say message inside of rich embed\n**Usage: **>say [COLOR] [message]\n**Example: **>say RED rexhawk is too beautiful!");
            return message.channel.send(richEmbed);
        }else {
            let bot_embed = new Discord.RichEmbed()
                .setColor(args[0].toUpperCase())
                .setDescription(localArgs.join(' '));
            await message.delete();
            return message.channel.send(bot_embed);
        }
    } else {
        await message.delete();
        return message.reply(`**ERROR**: \`permission(s): MANAGE_MESSAGES\` needed`);
    }
};

module.exports.help = {
    name: "say"
};