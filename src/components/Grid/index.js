import React from 'react';
import PropTypes from 'prop-types';

const Grid = props => {

  const columnsCSS = `columns${
    props.mobile ? ' is-mobile' : ''
  }${
    props.tablet ? ' is-tablet' : ''
  }${
    props.desktop ? ' is-desktop' : ''
  }${
    props.multiline ? ' is-multiline' : ''
  }${
    props.centered ? ' is-centered' : ''
  }${
    props.hidden ? ' is-invisible' : ''
  }${
    props.className ? ' ' + props.className : ''
  }`;

  return (
    <div className={columnsCSS}>
      {props.children}
    </div>
  );

};

Grid.propTypes = {};

Grid.Col = props => {

  const columnCSS = `column${
    props.narrow ? ' is-narrow' : ''
  }${
    props.size ? ' is-' + props.size : ''
  }${
    props.right ? ' is-aligned-right' : ''
  }${
    props.offset ? ' is-offset-' + props.offset : ''
  }${
    props.mobileSize ? ' is-' + props.mobileSize + '-mobile' : ''
  }${
    props.tabletSize ? ' is-' + props.tabletSize + '-tablet' : ''
  }${
    props.desktopSize ? ' is-' + props.desktopSize + '-desktop' : ''
  }${
    props.hidden ? ' is-invisible' : ''
  }${
    props.className ? ' ' + props.className : ''
  }`;

  return (
    <div className={columnCSS}>
      {props.children}
    </div>
  );

};

export default Grid;
