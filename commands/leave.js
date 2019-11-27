const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (String(message.content.split(" ")) === `${require("./../botconfig").prefix}leave`) {
        await message.delete();
        let richEmbed = new Discord.RichEmbed()
            .setColor("#333333")
            .setTitle("**Command:** >leave")
            .setDescription("**Description: **Leave an optional role\n**Usage: **>leave [role]\n**Example: **>leave ssu");
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
                    try {
                        const guildMember = message.member;
                        guildMember.removeRole(allowedRole);
                        return message.reply(`You have successfully left \`SSU\`.`);
                    } catch (err) {
                        return message.reply(`**ERROR: ** ${err}`)
                    }
                }
            } else {
                if (String(args[0]).toLowerCase() === "ssu") {
                    return message.reply(`**ERROR**: You are not in the ssu role. If you wish to join it, say \`>join ssu\``);
                }
            }
            if (message.member.roles.find(r => r.name === "QOTD")) {
                if (String(args[0]).toLowerCase() === "qotd") {
                    try {
                        const guildMember = message.member;
                        guildMember.removeRole(allowedRole);
                        return message.reply(`You have successfully left \`QOTD\`.`);
                    } catch (err) {
                        return message.reply(`**ERROR: ** ${err}`)
                    }
                }
            } else {
                if (String(args[0]).toLowerCase() === "qotd") {
                    return message.reply(`**ERROR**: You are not in the qotd role. If you wish to join it, say \`>join qotd\``);
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
    name: "leave"
};