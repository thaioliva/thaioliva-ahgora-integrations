import React from 'react';
import PropTypes from 'prop-types';

import { parsePropsAsBulmaClasses } from 'utils/utils';

const getType = any => toString.call(any).slice(8, -1);

const Button = props => {

  const buttonCSS = `button ${
    parsePropsAsBulmaClasses(props)
  }${
    props.theme ? ' is-' + props.theme : ''
  }${
    props.outlined ? ' is-outlined' : ''
  }${
    props.bare ? ' is-bare' : ''
  }${
    props.small ? ' is-small' : ''
  }${
    props.medium ? ' is-medium' : ''
  }${
    props.large ? ' is-large' : ''
  }${
    props.inverted ? ' is-inverted' : ''
  }${
    props.rounded ? ' is-rounded' : ''
  }${
    props.hovered ? ' is-hovered' : ''
  }${
    props.focused ? ' is-focused' : ''
  }${
    props.active ? ' is-active' : ''
  }${
    props.loading ? ' is-loading' : ''
  }${
    props.static ? ' is-static' : ''
  }${
    props.disabled ? ' is-disabled' : ''
  }${
    props.selected ? ' is-selected' : ''
  }${
    props.fullWidth ? ' is-fullwidth' : ''
  }${
    props.hidden ? ' is-invisible' : ''
  }${
    props.className ? ' ' + props.className : ''
  }`;

  const children = React.Children.toArray(props.children).map((element, index) => {
    if (getType(element) === 'String') {
      return (<span key={index}>{element}</span>);
    } else {
      return element;
    }
  });

  return (
    <button
      data-spec-selector={props.specSelector || props.id}
      type={props.submit ? 'submit' : 'button'}
      className={buttonCSS}
      onClick={props.onClick}
      disabled={props.disabled}>
      {children}
    </button>
  );

};

Button.propTypes = {};

export default Button;
