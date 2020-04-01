import React from 'react';
import PropTypes from 'prop-types';

import { parsePropsAsBulmaClasses } from 'utils/utils';

const Input = (props) => {
  const inputCSSClass = `input ${
    parsePropsAsBulmaClasses(props)
  }`;
  return (
    <input
      id={props.id}
      className={inputCSSClass}
      name={props.name}
      value={props.value}
      defaultValue={props.defaultValue}
      onClick={props.onClick}
      onChange={props.onChange}
      onInput={props.onInput}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      type={props.type || 'text'}
      placeholder={props.placeholder}
    />
  );
};

Input.propTypes = {
  id: PropTypes.any,
  name: PropTypes.any,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  placeholder: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

export default Input;
