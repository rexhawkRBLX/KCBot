const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let rich_Embed = new Discord.RichEmbed()
        .setAuthor("Game Information",bot.user.avatarURL,"https://www.roblox.com/groups/5210085/King-City-California")
        .setThumbnail("https://cdn.discordapp.com/attachments/622223331915202560/622551240626143232/King_City_CA.png")
        .setFooter("Additional Information can be found in the #information channel of the King City server. (Last updated 4/6/2020)")
        .setColor("#689ff5")
        .addField("King City Groups", `[King City, California](https://www.roblox.com/groups/5210085/King-City-California)\n[California Highway Patrol](https://www.roblox.com/groups/4876110/California-Highway-Patrol-Coastal-Division)\n[Police Department](https://www.roblox.com/groups/4897046/King-City-Police-Department)\n[Fire Department](https://www.roblox.com/groups/4898855/King-City-Fire-Department)\n[Department of Public Works](https://www.roblox.com/groups/5232362/King-City-Department-of-Public-Works)\n[Chamber of Commerce](https://www.roblox.com/groups/5375467/King-City-Chamber-of-Commerce)\n[Courts](https://www.roblox.com/groups/5352942/King-City-Courts)\n[Department of Corrections](https://www.roblox.com/groups/5276269/King-City-Department-of-Corrections)\n[Department of Emergency Management](https://www.roblox.com/groups/5787047/King-City-Department-of-Emergency-Management)\n[District Attorney's Office](https://www.roblox.com/groups/5375441/King-City-District-Attorneys-Office)\n[Monterey County Regional Public Safety Center](https://www.roblox.com/groups/5342129/Monterey-County-Regional-Public-Safety-Center)`,true)
        .addField("Discord Servers",`[King City, California](${require("./../retrieveInfo").getServerInvite["621475864546115611"]})\n[California Highway Patrol](${require("./../retrieveInfo").getServerInvite["569636982528016425"]})\n[Police Department](${require("./../retrieveInfo").getServerInvite["571777729448509440"]})\n[Fire Department](${require("./../retrieveInfo").getServerInvite["573681387094147085"]})\n[Association
](${require("./../retrieveInfo").getServerInvite["632986602993614869"]})\n[Chamber of Commerce](${require("./../retrieveInfo").getServerInvite["544031918912569356"]})\n[Courts](${require("./../retrieveInfo").getServerInvite["654916981245476874"]})\n[Department of Corrections](641827923317227552)\n[District Attorney's Office](${require("./../retrieveInfo").getServerInvite["648336531911606272"]})\n[Monterey County Regional Public Safety Center](643937169336958983)`, true)
        .addBlankField()
        .addField("King City Game",`[King City, California](https://www.roblox.com/games/4240465985/King-City-California)`);
    return message.reply(rich_Embed);
};

module.exports.help = {
    name: "info"
};
