import css from './contactlist.module.css';

const ContactList = ({ sortedNames, onClick }) => {
  const arrayNames = sortedNames.map(({ name, number, id }) => {
    return (
      <li className={css.item} key={id} id={id}>
        <p className={css.text}>
          {name}: {number}
        </p>
        <button onClick={onClick} type="button" className={css.btn}>
          Delete
        </button>
      </li>
    );
  });

  return <ul className={css.list}>{arrayNames}</ul>;
};

export default ContactList;
