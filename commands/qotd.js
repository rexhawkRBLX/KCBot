const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let allowedRole = message.guild.roles.find("name", "QOTD");

    if (String(message.guild.id) === "621475864546115611") {
        if (message.member.roles.find(r => r.name === "QOTD")) {
            try {
                const guildMember = message.member;
                guildMember.removeRole(allowedRole);
                return message.reply(`You have successfully left \`QOTD\`.`);
            } catch (err) {
                return message.reply(`**ERROR: ** ${err}`)
            }
        } else {
            const guildMember = message.member;
            try {
                guildMember.addRole(allowedRole);
                return message.reply(`You have successfully joined \`QOTD\`.`);
            } catch (err) {
                return message.reply(`**ERROR: ** ${err}`)
            }
        }
    } else {
        return message.reply(`**ERROR**: \`Incorrect Server\``);
    }
};

module.exports.help = {
    name: "qotd"
};
