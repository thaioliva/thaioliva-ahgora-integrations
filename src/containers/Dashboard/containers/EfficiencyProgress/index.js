import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import * as actions from '../../actions';

// Components
import LoadingContainer from 'components/LoadingContainer';
import Grid from 'components/Grid';
import EfficiencyProgressChart from 'lib/dataComponents/EfficiencyProgressChart';
import AggregationSizeSelector from 'lib/AggregationSizeSelector';
import SingleLineChart from 'lib/dataComponents/SingleLineChart';

import ShiftChart from 'lib/TotalProductionChartShifts';
import EfficiencyProgressBars from '../components/EfficiencyProgressBars';
import EfficiencyProgressSelector from 'lib/EfficiencyProgressSelector';

// Utils
import RouterUtils from 'utils/RouterUtils';

// Constants
import { colors } from 'core/constants';

import shiftsMock from '../components/shiftsMock';

export class EfficiencyProgress extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      otherGraphs: false
    };
  }
  render() {
    // Save isFetching prop
    const isFetching = this.props.isFetching;

    // Set all the constants necessary to hide or show Production Flow, Events and Current Production
    const isDay = RouterUtils.constant('isDay');
    const isAllLines = RouterUtils.constant('isAllLines');
    const isOneLine = RouterUtils.constant('isOneLine');
    const isShift = this.props.match.params.sector === 'shift';

    let legendKeys = [{
      label: 'Efficiency Progress',
      color: colors.primary.blue
    }];

    let chartArray = [...this.props.efficiencyProgress];

    if (isShift && this.props.efficiencyProgress.length > 0 && this.props.efficiencyProgress[0] && this.props.efficiencyProgress[0].shifts) {

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

              <EfficiencyProgressChart
                chartData={chartArray}
                legendKeys={legendKeys}
                isMultiline={isShift}
              />

            </LoadingContainer>

          </Grid.Col>
        </Grid>
        
        <EfficiencyProgressSelector
          current={this.state.otherGraphs}
          onChange={this.handleShowOtherGraphs.bind(this)}
        />

        {!isShift && this.state.otherGraphs ? <EfficiencyProgressBars {...this.props} /> : null}
      </React.Fragment>
    );
  }

  handleAggregationSize({ target }) {
    this.props.updateAggregationSize(target.value);
  }

  handleShowOtherGraphs({ target }) {
    this.setState({ otherGraphs: !this.state.otherGraphs });
  }
}

EfficiencyProgress.defaultProps = {
  isFetching: {},
  updateAggregationSize: () => { },
  aggregationSize: null,
  production: []
};

EfficiencyProgress.propTypes = {
  efficiencyProgress: PropTypes.array.isRequired,
  updateAggregationSize: PropTypes.func,
  aggregationSize: PropTypes.string,
  production: PropTypes.array
};

export default connect((store) => ({
  production: store.Dashboard.production,
  efficiency: store.Dashboard.efficiency,
  efficiencyProgress: store.Dashboard.efficiencyProgress,
  events: store.Dashboard.events,
  currentProduction: store.Dashboard.currentProduction,
  productionFlow: store.Dashboard.productionFlow,
  isFetching: store.Dashboard.isFetching
}), actions)(EfficiencyProgress);
