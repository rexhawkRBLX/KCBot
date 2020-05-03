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

loadData();

async function accessSpreadsheet() {
  try {
    await doc.loadInfo();
    console.log(doc.title);
  } catch (error) {
    console.error("Error caught (2): " + error )
  }
}

module.exports.run = async (bot, message, args) => {
  accessSpreadsheet();
};

module.exports.help = {
    name: "readdata"
};
