import css from "./contactlist.module.css"

const Filter = ({ value, onChange }) => {
  return (
    <label className={css.filter}>
      Find contacts by name
      <input
        className={css.field}
        type="text"
        name="filter"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};


export default Filter;