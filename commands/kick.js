const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (message.member.hasPermission("KICK_MEMBERS")){
        const arguments = message.content.split(' ').slice(1);
        const member_user = message.mentions.users.first();
        const kickReason = arguments.slice(1).join(' ');
        let member = message.mentions.members.first();
        // If there is no arguments
        if (String(message.content.split(" ")) === `${require("./../botconfig").prefix}kick`) {
            await message.delete();
            let richEmbed = new Discord.RichEmbed()
                .setColor("#333333")
                .setTitle("**Command:** >kick")
                .setDescription("**Description: **Kick a member from the server\n**Usage: **>kick [user] [reason]\n**Example: **>kick @rexhawk being too beautiful!");
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
        if (member === message.author) return message.reply(`**ERROR**: \`you cannot kick yourself.\``);
        if (!kickReason) return message.reply(`**ERROR**: \`invalid reason\``);
        if (!message.guild.member(member).bannable) return message.reply(`**ERROR**: \`sufficient permissions\``);

        await member.send(`You have been kicked from \`${message.guild.name}\` for the following reason(s): \`${kickReason}\`. You may rejoin with this link: ${require("./../retrieveInfo").getServerInvite[message.guild.id]}`);
        await member.kick(kickReason);

        const kickConfirmationEmbed = new Discord.RichEmbed()
            .setColor('#f54242')
            .setDescription(`:white_check_mark: \`${member_user.tag}\` has been successfully kicked`);
        await message.channel.send(kickConfirmationEmbed);

        if (require("./../retrieveInfo").getServerLog[message.guild.id].length !== 0) {
            if (!require("./../retrieveInfo").getServerLog[message.guild.id]) return undefined;
            let kickConfirmationEmbedModlog = new Discord.RichEmbed()
                .setAuthor(`Kicked by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
                .setThumbnail(member_user.displayAvatarURL)
                .setColor('#f54242')
                .setTimestamp(message.createdAt)
                .setDescription(`**Action**: Kick\n**User**: ${member_user.username}#${member_user.discriminator} (${member_user.id})\n**Reason**: ${kickReason}`);
            bot.channels.get(require("./../retrieveInfo").getServerLog[message.guild.id]).send(kickConfirmationEmbedModlog);
        }
        await message.delete();
    } else{
        await message.delete();
        return message.reply(`**ERROR**: \`permission(s): KICK_MEMBERS\` needed`);
    }
};

module.exports.help = {
    name: "kick"
};