const Discord               = require("discord.js");
const { GoogleSpreadsheet } = require("google-spreadsheet");

const doc = new GoogleSpreadsheet("1jxHUUtuGA6UdrwhQG44oo4M1eJwScMN7qztZCKH37ms");

async function loadData() {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.googleServiceAccount,
      private_key: process.env.googlePrivateKey,
    });
  } catch (error) {
    console.error("Error caught (1): " + error )
  }
}

function reformatString(string) {
	if (!string) return;
	if (string.startsWith('<@&') && string.endsWith('>')) {
		string = string.slice(2, -1);
	}
  return string;
}

loadData();

module.exports.run = async (bot, message, args) => {
  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();



    let found = false;
    
    if (args[0]) {
      let string = reformatString(args[0]);
      console.log(string);
    }

    for (let i = 0; i < rows.length ; i++) {
      if (rows[i].serverID == message.guild.id) {
        console.log("Hi")
      }
      console.log(rows[i].data1)
    }

  } catch (error) {
    console.error("Error caught (2): " + error )
  }
};

module.exports.help = {
    name: "setmod"
};
