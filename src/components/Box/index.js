import React from 'react';
import PropTypes from 'prop-types';

const Box = props => {

  const boxCSS = `box${
    props.hidden ? ' is-invisible' : ''
  }${
    props.padding ? ' has-padding-' + props.padding : ''
  }`;

  const boxStyles = {
    width: props.maxWidth ? '100%' : null,
    maxWidth: props.maxWidth
  };

  return (
    <div className={boxCSS} style={boxStyles}>
      {props.children}
    </div>
  );

};

Box.propTypes = {};

export default Box;
