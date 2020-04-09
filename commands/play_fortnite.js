const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    await message.delete();
    return message.channel.send("Thats a trash game go play king city on roblox instead bro");
};

module.exports.help = {
    name: "play_fortnite"
};
