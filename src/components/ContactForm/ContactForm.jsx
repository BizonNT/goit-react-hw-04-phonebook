import { Component } from 'react';
import { nanoid } from 'nanoid';

import css from './contactform.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInput = event => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  handleAddName = event => {
    event.preventDefault();
    const { name, number } = this.state;
    const nameId = event.currentTarget.elements.name.id;
    const arrayContacts = this.props.contacts.find(
      contact => contact.name === name
    );
    const arrayNumbers = this.props.contacts.find(
      contact => contact.number === number
    );

    if (arrayContacts) {
      alert(
        `${name} is already in contacts with number ${arrayContacts.number}`
      );
      return;
    }
    if (arrayNumbers) {
      alert(`${number} is already in contact ${arrayNumbers.name}`);
      return;
    }

    this.props.onSubmit({
      name,
      number,
      id: nameId,
    });

    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const nameId = nanoid();
    const phoneId = nanoid();
    return (
      <form className={css.info} onSubmit={this.handleAddName}>
        <label htmlFor={nameId} className={css.label}>
          Name
          <input
            className={css.field}
            type="text"
            name="name"
            required
            value={this.state.name}
            onChange={this.handleInput}
            id={nameId}
          />
        </label>
        <label htmlFor={phoneId} className={css.label}>
          Number
          <input
            className={css.field}
            type="tel"
            name="number"
            required
            value={this.state.number}
            onChange={this.handleInput}
            id={phoneId}
          />
        </label>
        <button className={css.btn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
