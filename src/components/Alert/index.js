import React from 'react';
import PropTypes from 'prop-types';

const Alert = props => {

  const notificationCSS = `notification${
    props.theme ? ' is-' + props.theme : ''
  }${
    props.fixed ? ' is-fixed' : ''
  }${
    props.fixed ? ' is-fixed-' + props.fixed : ''
  }${
    !props.visible ? ' is-invisible' : ''
  }`;

  return (
    <div className={notificationCSS}>
      <button className="delete" onClick={props.onClose}></button>
      {props.children}
    </div>
  );

};

Alert.propTypes = {};

export default Alert;
