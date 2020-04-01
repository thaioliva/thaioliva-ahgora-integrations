import React from 'react';
import PropTypes from 'prop-types';

const Icon = props => {

  const controlCSS = `control${
    props.iconsLeft ? ' has-icons-left' : ''
  }${
    props.iconsRight ? ' has-icons-right' : ''
  }${
    props.hidden ? ' is-invisible' : ''
  }`;

  return (
    <div className={controlCSS}>
      {props.children}
    </div>
  );

};

Icon.propTypes = {};

export default Icon;
