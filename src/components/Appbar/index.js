import React from 'react';

const Appbar = (props) => {
  const appBarCSSClass = `appbar${
    props.equalized ? ' is-equalized' : ''
  }${
    props.className ? ' ' + props.className : ''
  }`;
  return (
    <div className={appBarCSSClass}>
      {props.children}
    </div>
  );
};

Appbar.Child = (props) => {
  const appBarCSSClass = `appbar-child${
    props.left ? ' is-aligned-left' : ''
  }${
    props.center ? ' is-aligned-center' : ''
  }${
    props.right ? ' is-aligned-right' : ''
  }${
    props.grow ? ' is-grow' : ''
  }${
    props.className ? ' ' + props.className : ''
  }`;
  return (
    <div className={appBarCSSClass} style={props.style}>
      {props.children}
    </div>
  );
};

export default Appbar;
