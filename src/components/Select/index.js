import React from 'react';
import PropTypes from 'prop-types';

const Select = (props) => {
  const options = props.options.map((item, index) => {
    return (
      <option value={item.value || item[item.valueKey] || item[props.valueKey]} key={index}>
        {item.label || item[item.labelKey] || item[props.labelKey]}
      </option>
    );
  });
  return (
    <div className="select">
      <select
        id={props.id}
        name={props.name}
        value={props.value}
        defaultValue={props.defaultValue}
        onClick={props.onClick}
        onChange={props.onChange}
        onInput={props.onInput}
        onFocus={props.onFocus}
        onBlur={props.onBlur}>
        {props.placeholder ? <option value="">{props.placeholder}</option> : null}
        {options}
      </select>
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.array.isRequired,
  id: PropTypes.any,
  name: PropTypes.any,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

Select.defaultProps = {
  options: []
};

export default Select;
