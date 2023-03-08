import './FilterCheckbox.css';

function FilterCheckbox ({ checked, handleCheckbox }) {

  return (
    <fieldset className="switcher">
      <label className="switcher__area" htmlFor="checkbox">
      <input
      type="checkbox"
      id="checkbox"
      className="switcher__checkbox"
      checked={checked}
      onChange={() => handleCheckbox(!checked)}
      />
      <span className="switcher__slider"></span>
      </label>
      <p className="switcher__text">Короткометражки</p>
    </fieldset>
  )
}

export default FilterCheckbox;
