import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import * as actions from '../../actions';

// Components
import LoadingContainer from 'components/LoadingContainer';
import Grid from 'components/Grid';
import SingleLineChart from 'lib/dataComponents/SingleLineChart';
import AggregationSizeSelector from 'lib/AggregationSizeSelector';
//import ScrapAndEfficiency from '../components/ScrapAndEfficiency';
import Oee from '../components/OEE';

// Utils
import RouterUtils from 'utils/RouterUtils';

// Constants
import { colors } from 'core/constants';

import shiftsMock from '../components/shiftsMock';

export class TotalProduction extends React.PureComponent {

  render() {

    // Save isFetching prop
    const isFetching = this.props.isFetching;

    // Set all the constants necessary to hide or show Production Flow, Events and Current Production
    const isDay = RouterUtils.constant('isDay');
    const isAllLines = RouterUtils.constant('isAllLines');
    const isOneLine = RouterUtils.constant('isOneLine');

    // Show or hide Production Flow, Events and Current Production
    const showFlowSection = isDay && (isAllLines || isOneLine);

    const isShift = this.props.match.params.sector === 'shift';

    let legendKeys = [{
      label: 'Amount Produced',
      color: colors.primary.blue
    }, {
      label: 'Trend Line',
      color: colors.primary.grey
    }, {
      label: 'Production Goal',
      color: colors.primary.green
    }];

    let chartArray = [...this.props.production];

    if (isShift && this.props.production.length > 0 && this.props.production[0] && this.props.production[0].shifts) {

      chartArray = chartArray.map((item) => ({ ...item }));
      chartArray = chartArray.map((item) => {
        let newShifts = [...shiftsMock];
        item.shifts.forEach((shift) => {
          newShifts = newShifts.map((mock) => {
            mock.timestamp = item.timestamp;
            if (mock.shift == shift.shift) {
              mock = shift;
            }
            return mock;
          });
        });
        item.shifts = newShifts;
        return item;
      });

      legendKeys = [];
      chartArray[0].shifts.forEach((item, index) => {
        legendKeys.push({
          label: 'Shift' + (index + 1),
          color: colors.secondary[index]
        });
      });
    }

    return (
      <React.Fragment>

        <AggregationSizeSelector
          current={this.props.aggregationSize}
          onChange={this.handleAggregationSize.bind(this)}
        />

        <Grid>
          <Grid.Col>

            <LoadingContainer isActive={isFetching.production}>
              <SingleLineChart
                chartData={chartArray}
                legendKeys={legendKeys}
                isMultiline={isShift}
              />
            </LoadingContainer>

          </Grid.Col>
        </Grid>

        {/* {!isShift ? <ScrapAndEfficiency {...this.props}/> : null} */}
        {!isShift ? <Oee {...this.props} /> : null}

        {/* {showFlowSection && !isShift ? <FlowSection {...this.props} {...RouterUtils} /> : null} */}

      </React.Fragment>
    );
  }

  handleAggregationSize({ target }) {
    this.props.updateAggregationSize(target.value);
  }

}

TotalProduction.defaultProps = {
  isFetching: {},
  updateAggregationSize: () => {}
};

TotalProduction.propTypes = {
  production: PropTypes.array.isRequired
};

export default connect((store) => ({
  production: store.Dashboard.production,
  efficiency: store.Dashboard.efficiency,
  oee: store.Dashboard.oee,
  events: store.Dashboard.events,
  currentProduction: store.Dashboard.currentProduction,
  productionFlow: store.Dashboard.productionFlow,
  isFetching: store.Dashboard.isFetching
}), actions)(TotalProduction);
