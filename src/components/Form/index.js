import React from 'react';
import PropTypes from 'prop-types';

import { parsePropsAsBulmaClasses } from 'utils/utils';

const Form = (props) => {

  const formCSSClass = `form ${
    parsePropsAsBulmaClasses(props)
  }`;

  return (
    <form onSubmit={event => {
      event.preventDefault();
      props.onSubmit ? props.onSubmit(event) : null;
    }} className={formCSSClass} autoComplete="false">
      {props.children}
    </form>
  );

};

export default Form;
