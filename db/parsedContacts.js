const fs = require("fs").promises;
const contactsPath = require("./contactsPath");

async function parsedContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return console.error(error.message);
  }
}

module.exports = parsedContacts;
