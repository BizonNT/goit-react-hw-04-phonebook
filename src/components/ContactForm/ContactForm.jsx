import { useState, useMemo, memo } from 'react';
import { nanoid } from 'nanoid';

import css from './contactform.module.css';

export default function ContactForm({ onSubmit, contacts }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInput = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleAddName = event => {
    event.preventDefault();
    const nameId = event.currentTarget.elements.name.id;
    const arrayContacts = contacts.find(contact => contact.name === name);
    const arrayNumbers = contacts.find(contact => contact.number === number);

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

    onSubmit({
      name,
      number,
      id: nameId,
    });

    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const nameId = useMemo(() => nanoid(), [contacts]);
  const phoneId = useMemo(() => nanoid(), [contacts]);

  return (
    <form className={css.info} onSubmit={handleAddName}>
      <label htmlFor={nameId} className={css.label}>
        Name
        <input
          className={css.field}
          type="text"
          name="name"
          required
          value={name}
          onChange={handleInput}
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
          value={number}
          onChange={handleInput}
          id={phoneId}
        />
      </label>
      <button className={css.btn} type="submit">
        Add contact
      </button>
    </form>
  );
};
