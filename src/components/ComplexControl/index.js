import React from 'react';
import PropTypes from 'prop-types';

// Components
import Control from 'components/Control';

const Icon = props => {

  const helpCSS = `help${
    props.helpState ? ' is' + props.helpState : ''
  }${
    props.hidden ? ' is-invisible' : ''
  }`;

  return (
    <React.Fragment>
      <label className="label">{props.label}</label>
      <Control {...props}>
        {props.children}
      </Control>
      <p className={helpCSS}>{props.help}</p>
    </React.Fragment>
  );

};

Icon.propTypes = {};

export default Icon;
