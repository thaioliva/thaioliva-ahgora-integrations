import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';
import Tabs from 'lib/Tabs';
import Components from 'lib/Components';
import ViewSelector from 'lib/ViewSelector';

import { goto, compareParams } from 'utils/utils';

// Components
import Grid from 'components/Grid';
import ViewTitle from 'lib/ViewTitle';
import Form from 'components/Form';

// Redux
import { connect } from 'react-redux';
import * as actions from './actions';

// Utils
import buildPath from 'utils/buildPath';
import RouterUtils from 'utils/RouterUtils';
import ChildRoutes from 'utils/ChildRoutes';

export class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const params = RouterUtils.params;
    return (
      <React.Fragment>

        <div className="v-space-default" />
        <div className="v-space-default" />
        teste
        <Grid>
          <Grid.Col>
            <Form />
          </Grid.Col>
        </Grid>
        

      </React.Fragment>
    );
  }


}

Settings.propTypes = {};

Settings.defaultProps = {};

export default connect((store) => ({
  targets: store.app.targets
}), actions)(Settings);
