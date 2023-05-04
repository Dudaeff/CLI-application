const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.resolve("db", "contacts.json");

const updateListContacts = async (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) return null;
    const [removedContact] = contacts.splice(index, 1);
    await updateListContacts(contacts);
    return removedContact;
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (contactData) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...contactData,
    };
    contacts.push(newContact);
    await updateListContacts(contacts);
    return newContact;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
