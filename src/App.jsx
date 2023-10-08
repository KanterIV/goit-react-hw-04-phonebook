import { useEffect, useState } from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const ContactsData = {
    contacts,
    filter,
  };

  useEffect(() => {
    const stringifiedContacts = localStorage.getItem('contacts');
    const contactsArr = JSON.parse(stringifiedContacts) ?? [];
    setContacts(contactsArr);
  }, []);

  useEffect(() => {
    if (contacts.length === 0) {
      localStorage.removeItem('contacts');
      return;
    }

    const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringifiedContacts);
  }, [contacts]);

  const handleFilterInputChange = event => {
    setFilter(event.target.value);
  };

  const handleAddContact = contactData => {
    const hasContactDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === contactData.name.toLowerCase()
    );

    if (hasContactDuplicate) {
      alert(`${contactData.name} is already in contacts`);
      return;
    }

    setContacts(prevState => {
      return [...prevState, contactData];
    });
  };

  const onDeleteBtnClick = contactId => {
    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== contactId);
    });
  };

  const filterContactsArr = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div className={css.wrapper}>
      <h1 className={css.formTitle}>Phonebook</h1>
      <ContactForm handleAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter
        handleInputChange={handleFilterInputChange}
        ContactsData={ContactsData}
      />
      <ContactList
        contactsArr={filterContactsArr}
        deleteContact={onDeleteBtnClick}
      />
    </div>
  );
};
