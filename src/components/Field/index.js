import React from 'react';
import PropTypes from 'prop-types';

import { parsePropsAsBulmaClasses } from 'utils/utils';

const Field = (props) => {
  const fieldCSSClass = `field ${
    parsePropsAsBulmaClasses(props)
  }`;
  return (
    <div className={fieldCSSClass}>
      {props.label ? <label className="label is-normal">{props.label}</label> : null}
      <div className="control">
        {props.children}
      </div>
    </div>
  );
};

Field.propTypes = {
  children: PropTypes.any.isRequired
};

export default Field;
