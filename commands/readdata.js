const Discord               = require("discord.js");
const { GoogleSpreadsheet } = require("google-spreadsheet");

const doc = new GoogleSpreadsheet("1jxHUUtuGA6UdrwhQG44oo4M1eJwScMN7qztZCKH37ms");

function loadData() {
  await doc.useServiceAccountAuth({
    client_email: process.env.googleServiceAccount,
    private_key: process.env.googlePrivateKey,
  });
  await doc.loadInfo();
}

loadData();

async function accessSpreadsheet() {
  console.log(doc.title);
}

module.exports.run = async (bot, message, args) => {
  accessSpreadsheet();
};

module.exports.help = {
    name: "readdata"
};
