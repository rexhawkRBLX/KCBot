const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (message.member.hasPermission("ADMINISTRATOR")){
        message.channel.send(`${message.author} :white_check_mark: Initiating \`restart\` process...`)
            .then(msg => process.exit(1));
        await message.delete();
    } else{
        await message.delete();
        return message.reply(`**ERROR**: You must have the \`ADMINISTRATOR\` permission to execute this command.`);
    }
};

module.exports.help = {
    name: "restart"
};
