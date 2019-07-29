const botconfig = require("./botconfig.json");
const bottoken = process.env.token;
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true})

bot.on("ready", async ()=> {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("King City, California", {type: "PLAYING"});
});

bot.on("message", async message => {
   if (message.author.bot) return;
   if (message.channel.type === "dm") return;

   let prefix = botconfig.prefix;
   let messageArray = message.content.split(" ");
   let cmd = messageArray[0];
   let args = messageArray.slice(1);

   if (cmd === `${prefix}serverinfo`){

       let sicon = message.guild.iconURL;
       let serverembed = new Discord.RichEmbed()
           .setDescription("Server Information")
           .setColor("#f54242")
           .setThumbnail(sicon)
           .addField("Server name", message.guild.name)
           .addField("Created on", message.guild.createdAt)
           .addField("You joined",message.member.joinedAt)
           .addField("Total members", message.guild.memberCount);

       return message.channel.send(serverembed);
   }

    if (cmd === `${prefix}botinfo`){
        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
            .setDescription("Bot Information")
            .setColor("#f54242")
            .setThumbnail(bicon)
            .addField("Bot Name", bot.user.username)
            .addField("Created on", bot.user.createdAt);
        return message.channel.send(botembed);
    }

    if (cmd === `${prefix}say`){
        let localArgs = messageArray.slice(2);
            let botembed = new Discord.RichEmbed()
                .setColor(args[0])
                .setDescription(localArgs.join(' '));
            return message.channel.send(botembed);
    }
    if (cmd === `${prefix}ssay`){
        let localArgs = messageArray.slice(2);
        let botembed = new Discord.RichEmbed()
            .setColor(args[0])
            .setThumbnail("https://cdn--.discordapp.com/attachments/579769933219758148/605478475033346081/Icon.png")
            .setDescription(localArgs.join(' '));
        return message.channel.send(botembed);
    }
});

bot.login(bottoken).catch(err => console.log(err));