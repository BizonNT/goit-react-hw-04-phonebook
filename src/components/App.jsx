import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './ContactList/Filter';
import ContactList from './ContactList/ContactList';
import Notification from './Notification/Notification';

import css from './app.module.css';

const STORAGE_KEY = 'phonebook_names';

class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const storageData = localStorage.getItem(STORAGE_KEY);
    if (storageData !== null) {
      this.setState({ contacts: JSON.parse(storageData) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    }
  }

  formSubmitHandler = data => {
    const { contacts } = this.state;
    this.setState({ contacts: [...contacts, data] });
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  deleteContact = event => {
    const contactId = event.currentTarget.closest('li').id;
    const arrayAfterDelete = this.state.contacts.filter(
      contact => contact.id !== contactId
    );
    this.setState({ contacts: arrayAfterDelete });
  };

  render() {
    const { filter } = this.state;
    const { contacts } = this.state;
    const filterLowerCase = filter.toLowerCase();
    const sortedNames = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterLowerCase)
    );
    const length = contacts.length;

    return (
      <div className={css.container}>
        <h2 className={css.title}>Phonebook</h2>
        <ContactForm onSubmit={this.formSubmitHandler} contacts={contacts} />
        <h2 className={css.title}>Contacts</h2>
        {length > 0 ? (
          <>
            <Filter value={filter} onChange={this.changeFilter} />
            <ContactList
              sortedNames={sortedNames}
              onClick={this.deleteContact}
            />
          </>
        ) : (
          <Notification message="There is no contacts in the Phonebook" />
        )}
      </div>
    );
  }
}

export default App;
