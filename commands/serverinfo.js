const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let dateformat = [message.guild.createdAt.getMonth()+1,
        message.guild.createdAt.getDate(),
        message.guild.createdAt.getFullYear()].join('/');
    let server_embed = new Discord.RichEmbed()
        .addField("Server Owner",message.guild.owner.user.tag,true)
        .addField("Humans",message.guild.members.filter(member => !member.user.bot).size,true)
        .addField("Bots",message.guild.members.filter(member => member.user.bot).size,true)
        .addField("Total members",message.guild.memberCount,true)
        .addField("Text Channels",message.guild.channels.size,true)
        .addField("Roles",message.guild.roles.size,true)
        .setFooter(`${message.guild.id} • Created on ${dateformat}`)
        .setColor("#689FF5")
        .setAuthor(message.guild.name,bot.user.avatarURL);
    await message.delete();
    return message.channel.send(server_embed);
};

module.exports.help = {
    name: "serverinfo"
};