import React from 'react';
import ReactTimeout from 'react-timeout';

const defaultOptions = {
  time: 300,
  children: null
};

const SplashScreen = (props) => (
  <div className={`splash-screen${props.isVisible ? ' is-visible' : ''}`}>
    {props.children}
  </div>
);

export function withSplashScreen(Component, options = defaultOptions) {

  class SplashScreenWrapper extends React.Component {

    constructor(props) {
      super(props);
      this.state = { isVisible: true };
    }

    componentDidMount() {
      this.props.setTimeout(() => {
        this.setState({ isVisible: false });
      }, options.time);
    }

    componentWillUnmount() {
      this.setState({ isVisible: true });
    }

    render() {
      return (
        <React.Fragment>
          <SplashScreen isVisible={this.state.isVisible}>{options.children}</SplashScreen>
          <Component {...this.props} />
        </React.Fragment>
      );
    }

  };

  SplashScreenWrapper.displayName = `SplashScreenWrapper(${getDisplayName(Component)})`;

  return ReactTimeout(SplashScreenWrapper);

};

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
};

export default SplashScreen;
