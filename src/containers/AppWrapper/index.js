import React from 'react';
import PropTypes from 'prop-types';
import withTimeout from 'react-timeout';

// Redux
import { connect } from 'react-redux';
import * as actions from './actions';

// Components
import SplashScreen, { withSplashScreen } from 'components/SplashScreen';
import Layout from 'components/Layout';
import MainHeader from './components/MainHeader';

// Utils
import ChildRoutes from 'utils/ChildRoutes';

export class AppWrapper extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = { isSplashScreenActive: false };
  }

  componentDidMount() {
  }

  render() {
    return (
      <Layout>

        <SplashScreen isVisible={this.state.isSplashScreenActive} />

        <Layout.Header>
          <MainHeader
           
          />
        </Layout.Header>

        <Layout.Body>
          <Layout.Main>
            <ChildRoutes {...this.props} />
          </Layout.Main>
        </Layout.Body>

      </Layout>
    );
  }
};

AppWrapper.defaultProps = {
  isSessionActive: null
};

AppWrapper.propTypes = { isSessionActive: PropTypes.bool };

export default connect((store) => ({
  isSessionActive: store.app.isSessionActive,
}), Object.assign(actions))(withSplashScreen(withTimeout(AppWrapper)));
