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

module.exports.run = async (bot, message, args) => {
  try {
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    for (let i = 0; i < rows.length ; i++) {
      console.log("HI");
    }
    console.log(rows[0].id);

  } catch (error) {
    console.error("Error caught (2): " + error )
  }
};

module.exports.help = {
    name: "readdata"
};
