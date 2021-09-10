import React from "react";
import PropTypes from "prop-types";
import Label from "./Label";

const Select = ({ options, onChange, value, title = "", ...rest }) => {
  return (
      
    <div>
    <label>
      <Label title={title} />
      <select onChange={onChange} value={value}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>
    </label>
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
  title: PropTypes.string,
};

export default Select;
