const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

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

    return await message.reply(message);
};

module.exports.help = {
    name: "host"
};
