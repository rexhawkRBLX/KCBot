const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (String(message.content.split(" ")) === `${require("./../botconfig").prefix}join`) {
        await message.delete();
        let richEmbed = new Discord.RichEmbed()
            .setColor("#333333")
            .setTitle("**Command:** >join")
            .setDescription("**Description: **Join an optional role\n**Usage: **>join [role]\n**Example: **>join ssu");
        return message.channel.send(richEmbed);
    }
    if (String(args[0]).toLowerCase() === "ssu" || String(args[0]).toLowerCase() === "qotd") {
        let allowedRole;
        if (String(args[0]).toLowerCase() === "ssu") {
            allowedRole = message.guild.roles.find("name", "SSU");
        } else {
            allowedRole = message.guild.roles.find("name", "QOTD");
        }
        if (String(message.guild.id) === "621475864546115611") {
            if (message.member.roles.find(r => r.name === "SSU")) {
                if (String(args[0]).toLowerCase() === "ssu") {
                    return message.reply(`**ERROR**: You already have the ssu role. If you wish to remove it, say \`>leave ssu\``);
                }
            } else {
                if (String(args[0]).toLowerCase() === "ssu") {
                    const guildMember = message.member;
                    try {
                        guildMember.addRole(allowedRole);
                        return message.reply(`You have successfully joined \`SSU\`.`);
                    } catch (err) {
                        return message.reply(`**ERROR: ** ${err}`)
                    }
                }
            }
            if (message.member.roles.find(r => r.name === "QOTD")) {
                if (String(args[0]).toLowerCase() === "qotd") {
                    return message.reply(`**ERROR**: You already have the qtod role. If you wish to remove it, say \`>leave qotd\``);
                }
            } else {
                if (String(args[0]).toLowerCase() === "qotd") {
                    const guildMember = message.member;
                    try {
                        guildMember.addRole(allowedRole);
                        return message.reply(`You have successfully joined \`QOTD\`.`);
                    } catch (err) {
                        return message.reply(`**ERROR: ** ${err}`)
                    }
                }
            }
        } else {
            return message.reply(`**ERROR**: \`Incorrect Server\``);
        }
    } else {
        return message.reply(`**ERROR**: \`Role not found or is not optional.\``);
    }
};

module.exports.help = {
    name: "join"
};