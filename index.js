// Heroku Logs Command: heroku logs --app kingcity-bot -t

const http = require("http");
const bot_config = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const PORT = process.env.PORT || 3000;
const app = require("express")();
const bot = new Discord.Client({disableEveryone: true});
const prefix = bot_config.prefix;

let activity = "King City, California";
bot.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0){
        return console.log("Couldnt find commands.");
    }
    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        bot.commands.set(props.help.name, props);
    });
});
app.listen(PORT, () => {
    console.log(`KCBot is running on port ${ PORT }`);
});
bot.on("ready", async() => {

    // bot.channels.get('622224689309155338').send(`KC Bot is online back online running on port \`${PORT}\``);
    function setActivity() {
        setInterval(function () {
            if (activity === "King City, California") {
                bot.user.setActivity("King City, California", {type: "PLAYING"});
                activity = "KC, California | >help";
            } else if (activity === "KC, California | >help") {
                bot.user.setActivity("KC, California | >help", {type: "PLAYING"});
                activity = "over King City, California";
            } else if (activity === "over King City, California") {
                bot.user.setActivity("over King City, California", {type: "WATCHING"});
                activity = "King City, California";
            }
        }, 15000); // every 15 seconds
    }
    setActivity(); // Set activity to bot
});
bot.on("message", async message => {
   if (message.author.bot) return;
   if (message.channel.type === "dm") return;
   if (message.author.id == "551451030471049222") {
     let messageArray = message.content.split(" ");
     let cmd = messageArray[0].toLowerCase();
     let args = messageArray.slice(1);
     // Functions
     if (message.content.startsWith(prefix)){

         let commandFile = bot.commands.get(cmd.slice(prefix.length));
         if (commandFile) await commandFile.run(bot,message,args);
     }
   }
});
// Prevent exit 143 (Idle exit)
function KeepAlive() {
    setInterval(function() {
        let options = {
            host: 'kingcity-bot.herokuapp.com',
            port: 80,
            path: '/'
        };
        http.get(options, function(res) {
            res.on('data', function(chunk) {
                try {
                    console.log("Heroku Awake: Prevented 143");
                } catch (err) {
                    console.log(err.message);
                }
            });
        }).on('error', function(err) {
            console.log("Error: " + err.message);
        });
    }, 10 * 60 * 1000); // load every 20 minutes
}
KeepAlive(); // Keep from idling

bot.login(process.env.token).catch(err => console.log(err));
