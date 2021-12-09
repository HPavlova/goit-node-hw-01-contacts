const fs = require("fs").promises;
const contactsPath = require("./contactsPath");

async function updateContacts(newContacts) {
  try {
    const data = await fs.writeFile(
      contactsPath,
      JSON.stringify(newContacts, null, "\t"),
      "utf8"
    );
    return data;
  } catch (error) {
    return console.error(error.message);
  }
}

module.exports = updateContacts;
