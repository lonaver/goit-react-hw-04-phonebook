import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import styles from './App.module.css';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const phoneBookLS = 'KEY_PHONE_BOOK';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(phoneBookLS))
  );
  const [visibleContacts, setVisibleContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(phoneBookLS, JSON.stringify([...contacts]));
  }, [contacts]);

  useEffect(() => {
    const normoliseFilter = filter.toLowerCase();
    setVisibleContacts(
      contacts.filter(
        ({ name, number }) =>
          name.toLowerCase().includes(normoliseFilter) ||
          number.toLowerCase().includes(normoliseFilter)
      )
    );
  }, [filter, contacts]);

  const AddContact = ({ name, number }) => {
    const normoliseName = name.toLowerCase();
    const contactFind = contacts.find(
      contact =>
        contact.name.toLowerCase() === normoliseName ||
        contact.number === number
    );
    if (contactFind) {
      alert(`${contactFind.name} is alredy contact`);
      return;
    }

    const newContact = { id: nanoid(), name, number };
    setContacts(prevState => [newContact, ...prevState]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = idContact => {
    setContacts(prevState => prevState.filter(({ id }) => id !== idContact));
  };

  return (
    <div className={styles.contacts}>
      <h1>Phone book</h1>
      <ContactForm onSubmit={AddContact}></ContactForm>
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter}></Filter>
      {contacts.length > 0 && (
        <ContactList
          contacts={visibleContacts}
          handleDelete={deleteContact}
        ></ContactList>
      )}
    </div>
  );
};

export default App;
