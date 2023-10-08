import css from './Filter.module.css';

export const Filter = ({ handleInputChange }) => {
  return (
    <>
      <p>Fined contacts by name</p>
      <input
        className={css.filterInput}
        onChange={handleInputChange}
        type="text"
        name="filter"
      />
    </>
  );
};
