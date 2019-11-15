const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
        // If there is no arguments
        if (String(message.content.split(" ")) === `${require("./../botconfig").prefix}prune`) {
            await message.delete();
            let richEmbed = new Discord.RichEmbed()
                .setColor("#333333")
                .setTitle("**Command:** >prune")
                .setDescription("**Description: **Delete a set number of messages\n**Usage: **>prune [amount]\n**Example: **>prune 50");
            return message.channel.send(richEmbed);
        }
        if (isNaN(args[0])) return message.reply(`**ERROR**: Invalid amount. Please supply a number between \`1\` and \`100\``);
        if (Number(args[0]) > 100) return message.reply(`**ERROR**: Invalid amount. Please supply a number between \`1\` and \`100\``);
        await message.delete();
        message.channel.bulkDelete(args[0])
         .catch( error => message.channel.send(`**ERROR**: \`${error.message}\``));
    }else{
        await message.delete();
        return message.reply(`**ERROR**: \`permission(s): MANAGE_MESSAGES\` needed`);
    }
};

module.exports.help = {
    name: "prune"
};