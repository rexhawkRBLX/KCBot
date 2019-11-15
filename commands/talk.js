const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let localArgs =  message.content.split(" ").slice(1);
    if (message.member.hasPermission("MANAGE_MESSAGES"))  {
        // If there is no arguments
        if (String(message.content.split(" ")) === `${require("./../botconfig").prefix}talk`) {
            await message.delete();
            let richEmbed = new Discord.RichEmbed()
                .setColor("#333333")
                .setTitle("**Command:** >talk")
                .setDescription("**Description: **Make KCBot say message\n**Usage: **>talk [message]\n**Example: **>talk rexhawk is too beautiful!");
            return message.channel.send(richEmbed);
        }else {
            await message.delete();
            return message.channel.send(localArgs.join(' '));
        }
    } else {
        await message.delete();
        return message.reply(`**ERROR**: \`permission(s): MANAGE_MESSAGES\` needed`);
    }
};

module.exports.help = {
    name: "talk"
};