const Discord               = require("discord.js");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const { promisify }         = require("util");
const creds                 = require("./../client_secret.json");

async function accessSpreadsheet() {
  const doc = new GoogleSpreadsheet("1jxHUUtuGA6UdrwhQG44oo4M1eJwScMN7qztZCKH37ms");
  await promisify(doc.useServiceAccountAuth)(creds);

  const info = await promisify(doc.getInfo)();
  const sheet = info.worksheets[0];
  console.log(`Title: ${sheet.title}`);
}

module.exports.run = async (bot, message, args) => {
    accessSpreadsheet();
};

module.exports.help = {
    name: "readdata"
};
