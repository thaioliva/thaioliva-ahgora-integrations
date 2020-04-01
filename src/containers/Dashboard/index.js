import React from 'react';

// Redux
import { connect } from 'react-redux';
import * as actions from './actions';

// Components
import AnalyticsHOC from 'containers/Analytics';

// Utils
import ChildRoutes from 'utils/ChildRoutes';
import compareParams from 'utils/compareParams';
import RouterUtils from 'utils/RouterUtils';


export class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      aggregationSize: 'day'
    };
  }

  componentDidMount() {
    console.log('go');
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    return (
      <React.Fragment>
        <ChildRoutes
         
        />
      </React.Fragment>
    );
  }

}

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
