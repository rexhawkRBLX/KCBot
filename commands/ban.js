const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (message.member.hasPermission("BAN_MEMBERS")){
        const arguments = message.content.split(' ').slice(1);
        const member_user = message.mentions.users.first();
        const banReason = arguments.slice(1).join(' ');
        let member = message.mentions.members.first();
        // If there is no arguments
        if (String(message.content.split(" ")) === `${require("./../botconfig").prefix}ban`) {
            await message.delete();
            let richEmbed = new Discord.RichEmbed()
                .setColor("#333333")
                .setTitle("**Command:** >ban")
                .setDescription("**Description: **Ban a member from the server\n**Usage: **>ban [user] [reason]\n**Example: **>ban @rexhawk being too beautiful!");
            return message.channel.send(richEmbed);
        }
        if (!member) {
            try {
                if (!message.guild.members.get(arguments.slice(0, 1).join(' '))) await message.reply(`**ERROR**: \`user not found\``);
                member = message.guild.members.get(arguments.slice(0, 1).join(' '));
                member = member.user;
            } catch (error) {
                return await message.reply(`**ERROR**: \`user not found\``);
            }
        }
        if (member === message.author) return message.reply(`**ERROR**: \`you cannot ban yourself.\``);
        if (!banReason) return message.reply(`**ERROR**: \`invalid reason\``);
        if (!message.guild.member(member).bannable) return message.reply("**ERROR**: \`insufficient permissions\`");

        await member.send(`You have been banned from \`${message.guild.name}\` for the following reason(s): \`${banReason}\``);
        await member.ban(banReason);

        const banConfirmationEmbed = new Discord.RichEmbed()
            .setColor('#f54242')
            .setDescription(`:white_check_mark: \`${member_user.tag}\` has been successfully banned`);
        await message.channel.send(banConfirmationEmbed);

        if (require("./../retrieveInfo").getServerLog[message.guild.id].length !== 0) {
            if (!require("./../retrieveInfo").getServerLog[message.guild.id]) return undefined;
            let banConfirmationEmbedModlog = new Discord.RichEmbed()
                .setAuthor(`Banned by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
                .setThumbnail(member_user.displayAvatarURL)
                .setColor('#f54242')
                .setTimestamp(message.createdAt)
                .setDescription(`**Action**: Ban\n**User**: ${member_user.username}#${member_user.discriminator} (${member_user.id})\n**Reason**: ${banReason}`);
            bot.channels.get(require("./../retrieveInfo").getServerLog[message.guild.id]).send(banConfirmationEmbedModlog);
        }
        await message.delete();
    } else{
        await message.delete();
        return message.reply(`**ERROR**: \`permission(s): ban_members\` needed`);
    }
};

module.exports.help = {
    name: "ban"
};
