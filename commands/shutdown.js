const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (message.member.hasPermission("ADMINISTRATOR")){
        await message.reply(`:white_check_mark: Initiating \`shutdown\` process...`);
        await bot.destroy();
    } else{
        await message.delete();
        return message.reply(`**ERROR**: You must have the \`ADMINISTRATOR\` permission to execute this command.`);
    }
};

module.exports.help = {
    name: "shutdown"
};