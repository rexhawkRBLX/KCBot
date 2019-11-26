const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let rich_Embed = new Discord.RichEmbed()
        .setAuthor("Game Information",bot.user.avatarURL,"https://www.roblox.com/groups/5210085/King-City-California")
        .setThumbnail("https://cdn.discordapp.com/attachments/622223331915202560/622551240626143232/King_City_CA.png")
        .setFooter("Additional Information can be found in the #information channel of the King City server.")
        .setColor("#689ff5")
        .addField("King City Groups", `[King City, California](https://www.roblox.com/groups/5210085/King-City-California)\n[California Highway Patrol](https://www.roblox.com/groups/4876110/California-Highway-Patrol-Coastal-Division)\n[King City Police Department](https://www.roblox.com/groups/4897046/King-City-Police-Department)\n[King City Fire Department](https://www.roblox.com/groups/4898855/King-City-Fire-Department)\n[King City DoPW](https://www.roblox.com/groups/5232362/King-City-Department-of-Public-Works)`,true)
        .addField("Discord Servers",`[King City, California](${require("./../retrieveInfo").getServerInvite["621475864546115611"]})\n[California Highway Patrol](${require("./../retrieveInfo").getServerInvite["569636982528016425"]})\n[King City Police Department](${require("./../retrieveInfo").getServerInvite["571777729448509440"]})\n[King City Fire Department](${require("./../retrieveInfo").getServerInvite["573681387094147085"]})\n[King City DoPW](${require("./../retrieveInfo").getServerInvite["632986602993614869"]})\n[King City CoC](${require("./../retrieveInfo").getServerInvite["544031918912569356"]})\n[District Attorney's Office](${require("./../retrieveInfo").getServerInvite["648336531911606272"]})`, true)
        .addBlankField()
        .addField("King City Game",`[King City, California](https://www.roblox.com/games/3571375889/King-City-California)`);
    return message.reply(rich_Embed);
};

module.exports.help = {
    name: "info"
};