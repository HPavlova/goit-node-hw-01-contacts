const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const PORT = 8080;

const contactsPath = path.resolve("./db/contacts.json");

async function parsedContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return console.error(error.message);
  }
}

async function writtenContacts() {
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

async function listContacts() {
  const contacts = await parsedContacts();
  console.table(contacts);
  return contacts;

  if (error) {
    console.error(error.message);
  }
}

async function getContactById(contactId) {
  const contacts = await parsedContacts();
  try {
    const contact = contacts.find((id) => (id = contactId));
    if (!contact) {
      return console.error(`Contact with ID ${contactId} not found!`);
    }
    console.table(contact);
    return contact;
  } catch (error) {
    return console.error(error.message);
  }
}

async function removeContact(contactId) {
  const contacts = await parsedContacts();
  try {
    const newContacts = contacts.filter((id) => id !== contactId);
    if (contacts.length === newContacts.length) {
      return console.error(`Contact with ID ${contactId} not found!`);
    }
    writtenContacts();
    console.table(contacts);
    return newContacts;
  } catch (error) {
    return console.error(error.message);
  }
}

async function addContact(name, email, phone) {
  const contacts = await parsedContacts();
  try {
    if (
      contacts.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return console.error("This name already exists!");
    }

    if (
      contacts.find(
        (contact) => contact.email.toLowerCase() === email.toLowerCase()
      )
    ) {
      return console.error("This email already exists!");
    }

    if (
      contacts.find(
        (contact) => contact.phone.toLowerCase() === phone.toLowerCase()
      )
    ) {
      return console.error("This phone already exists!");
    }

    const newContact = { id: shortid.generate(), name, email, phone };
    const newContacts = [...contacts, newContact];
    writtenContacts();
    console.table(contacts);
    return newContacts;
  } catch (error) {
    return console.error(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
