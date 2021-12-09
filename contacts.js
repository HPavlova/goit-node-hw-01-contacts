const shortid = require("shortid");

const parsedContacts = require("./db/parsedContacts");
const updateContacts = require("./db/updateContacts");

const PORT = 8080;

async function listContacts() {
  const contacts = await parsedContacts();
  console.table(contacts);
  return contacts;

  if (error) {
    console.error(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await parsedContacts();
    const contact = contacts.find(({ id }) => id == contactId);
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
  try {
    const contacts = await parsedContacts();
    const newContacts = contacts.filter(({ id }) => id !== `${contactId}`);

    if (contacts.length === newContacts.length) {
      return console.error(`Contact with ID ${contactId} not found!`);
    }

    await updateContacts(newContacts);

    console.table(newContacts);

    return newContacts;
  } catch (error) {
    return console.error(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await parsedContacts();
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
    contacts.push(newContact);
    await updateContacts(contacts);
    console.table(contacts);
    return contacts;
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
