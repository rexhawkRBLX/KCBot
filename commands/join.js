const Discord = require("discord.js");



module.exports.run = async (bot, message, args) => {
    let allowedRole = message.guild.roles.find("name", "SSU");
    if (String(message.guild.id) === "621475864546115611") {
        if (message.member.roles.find(r => r.name === "SSU")) {
            return message.reply(`**ERROR**: You already have the ssu role. If you wish to remove it, say \`>leave ssu\``);
        } else {
            message.member.addRole("SSU");
            return message.reply(`You have successfully joined \`SSU\`.`);
        }
    } else {
        return message.reply(`**ERROR**: \`Incorrect Server\``);
    }
};

module.exports.help = {
    name: "join"
};


if (command === "commandname"){
    let allowedRole = message.guild.roles.find("name", "rolename");
    if (message.member.roles.has(allowedRole.id) {
        // allowed access to command
    } else {
        // not allowed access
    }
}