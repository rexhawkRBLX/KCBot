const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let pmEmbed = new Discord.RichEmbed()
        .setAuthor("KCBot Commands",bot.user.avatarURL,"https://www.roblox.com/groups/5210085/King-City-California")
        .setColor("#689FF5")
        .addField("Bot Maintenance","**>restart**: Reboots the bot client to reset errors. \`Administrator\`\n**>shutdown**: Shuts down the bot client. (requires manual reboot) \`Administrator\`\n**>version**: Returns the current bot version. \`Everyone\`\n**>botinfo**: Returns more detailed information about KCBot. \`Everyone\`\n", true)
        .addField("Moderation","**>ban**: Bans the specified player. \`Ban Permission\`\n**>kick**: Kicks the specified player. \`Kick Permission\`\n**>prune**: Bulk deletes the specified amount of messages. \`Manage Messages Permission\`\n**>report**: Reports the specified player for later moderation and punishment. \`Everyone\`\n", true)
        .addField("Fun","**>join**: Join an optional role. \`Everyone\`\n**>leave**: Leave an optional role. \`Everyone\`\n**>ssu**: Announces a server start up. \`Mange Messages Permission\`\n**>info**: Returns a list of current discord invites and group links. \`Everyone\`\n**>invites**: Returns a leaderboard of the most used invites \'Everyone\'\n**>serverinfo**: Returns more detailed information about the current server \`Everyone\`\n**>serverphoto**: Returns the current server's photo \`Everyone\`\n**>say**: Uses the bot to repeat message inside of RichEmbed with specified color. \`Manage Messages Permission\`\n**>talk**: Uses the bot to repeat message \`Manage Messages Permission\`\n**>help**: Causes the bot to DM a list of commands \`Everyone\`\n")
        .setFooter("For additional information, DM the bot's creator: rexhawk#0132");
    let waitMsg = await message.channel.send("Working...");
    await message.author.send(pmEmbed);
    return await waitMsg.edit(`${message.author} :white_check_mark: Complete! Check your DMs!`);
};

module.exports.help = {
    name: "help"
};