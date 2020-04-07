const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let rich_Embed = new Discord.RichEmbed()
        .setAuthor("Game Information",bot.user.avatarURL,"https://www.roblox.com/groups/5210085/King-City-California")
        .setThumbnail("https://cdn.discordapp.com/attachments/622223331915202560/622551240626143232/King_City_CA.png")
        .setFooter("[King City, California](https://www.roblox.com/games/4240465985/King-City-California) | Additional Information can be found in the #information channel of the King City server.")
        .setColor("#689ff5")
        .setDescription("[King City, California Groups & Invites](https://docs.google.com/document/d/1ZQaTtIR5Gt0quD0vWSCwd8Fap6sY2zjsIWFIH0NBY_M/edit?usp=sharing)")
    return message.reply(rich_Embed);
};

module.exports.help = {
    name: "info"
};
