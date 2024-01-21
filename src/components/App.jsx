import { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './ContactList/Filter';
import ContactList from './ContactList/ContactList';
import Notification from './Notification/Notification';

import css from './app.module.css';

const STORAGE_KEY = 'phonebook_names';

export default function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem(STORAGE_KEY)) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    setContacts(prevState => [...prevState, data]);
  };

  const deleteContact = event => {
    const contactId = event.currentTarget.closest('li').id;
    const arrayAfterDelete = contacts.filter(
      contact => contact.id !== contactId
    );
    setContacts(arrayAfterDelete);
  };

  const filterLowerCase = filter.toLowerCase();
  const sortedNames = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterLowerCase)
  );
  const length = contacts.length;

  return (
    <div className={css.container}>
      <h2 className={css.title}>Phonebook</h2>
      <ContactForm onSubmit={formSubmitHandler} contacts={contacts} />
      <h2 className={css.title}>Contacts</h2>
      {length > 0 ? (
        <>
          <Filter
            value={filter}
            onChange={event => {
              setFilter(event.currentTarget.value);
            }}
          />
          <ContactList sortedNames={sortedNames} onClick={deleteContact} />
        </>
      ) : (
        <Notification message="There is no contacts in the Phonebook" />
      )}
    </div>
  );
}
