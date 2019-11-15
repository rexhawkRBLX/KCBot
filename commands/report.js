const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let reported_User = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let reason = args.join(" ").slice(22);

    // If there is no arguments
    if (String(message.content.split(" ")) === `${require("./../botconfig").prefix}report`) {
        await message.delete();
        let richEmbed = new Discord.RichEmbed()
            .setColor("#333333")
            .setTitle("**Command:** >report")
            .setFooter("Abuse of this command will result in administrative action.")
            .setDescription("**Description: **Report a member for later moderation\n**Usage: **>report [user] [reason]\n**Example: **>report @rexhawk being too beautiful!");
        return message.channel.send(richEmbed);
    }

    if (!reported_User) return message.channel.send(`**ERROR**: \`user not found\` `);

    let reportEmbed = new Discord.RichEmbed()
        .setColor("#f54242")
        .setAuthor(message.author.tag,message.author.avatarURL)
        .setDescription(`Reporting ${reported_User}[Jump to report](${message.url})\n`)
        .addField("Reason",`\`${reason}\``)
        .setTimestamp(message.createdAt);
    await message.delete();
    await bot.channels.get(require("./../retrieveInfo").getServerReport(String(message.guild.id))).send(reportEmbed);
    return message.channel.send(`:white_check_mark: Successfully reported ${String(reported_User)} for \`${reason}\`.`);
};

module.exports.help = {
    name: "report"
};