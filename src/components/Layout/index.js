import React from 'react';

const Layout = props => {

  const layoutCSS = `layout${
    props.vhCentered ? ' is-vhcentered' : ''
  }${
    props.className ? ' ' + props.className : ''
  }`;

  return (
    <div className={layoutCSS}>
      {props.children}
    </div>
  );
};

Layout.Header = props => {

  const layoutHeaderCSS = `layout-header`;

  return (
    <div className={layoutHeaderCSS}>
      {props.children}
    </div>
  );
};

Layout.Body = props => {

  const layoutBodyCSS = `layout-body`;

  return (
    <div className={layoutBodyCSS}>
      {props.children}
    </div>
  );
};

Layout.Main = props => {

  const layoutMainCSS = `layout-main has-no-padding-top`;

  return (
    <main className={layoutMainCSS} role="main">
      {props.children}
    </main>
  );
};

Layout.Footer = props => {

  const layoutFooterCSS = `layout-footer`;

  return (
    <footer className={layoutFooterCSS} role="contentinfo">
      {props.children}
    </footer>
  );
};

export default Layout;
