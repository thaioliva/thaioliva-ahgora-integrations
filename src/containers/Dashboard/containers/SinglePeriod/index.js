import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import * as actions from '../../actions';

// Components
import LoadingContainer from 'components/LoadingContainer';
import Grid from 'components/Grid';
import SingleBarChart from 'lib/dataComponents/SingleBarChart';
import AggregationSizeSelector from 'lib/AggregationSizeSelector';
import ScrapAndEfficiency from '../components/ScrapAndEfficiency';
import ShiftChart from 'lib/SinglePeriodChartShifts';
import Oee from '../components/OEE';

// Utils
import RouterUtils from 'utils/RouterUtils';

// Constants
import { colors } from 'core/constants';

import shiftsMock from '../components/shiftsMock';

export class SinglePeriod extends React.PureComponent {

  render() {

    // Save isFetching prop
    const isFetching = this.props.isFetching;

    // Set all the constants necessary to hide or show Production Flow, Events and Current Production
    const isDay = RouterUtils.constant('isDay');
    const isAllLines = RouterUtils.constant('isAllLines');
    const isOneLine = RouterUtils.constant('isOneLine');

    // Show or hide Production Flow, Events and Current Production
    const showFlowSection = isDay && (isAllLines || isOneLine);

    // The reference lines use the same values repeated all over the chartData array
    const referenceValues = this.props.production[0];

    const isShift = this.props.match.params.sector === 'shift';

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

              {isShift ?
                <ShiftChart productionData={chartArray} {...this.props} />
                :
                <SingleBarChart
                  chartData={chartArray}
                  color={colors.primary.blue}
                  dataKey="countTotal"
                  referenceLines={[{
                    y: referenceValues ? referenceValues.singlePeriodTarget : null,
                    stroke: '#34C888'
                  }, {
                    y: referenceValues ? referenceValues.singlePeriodAverage : null,
                    strokeDasharray: '2 3',
                    stroke: '#888F9D'
                  }]}
                  tooltipCards={['toGoalOnSinglePeriod', 'scrapOnSinglePeriod', 'periodProduction']}
                  legendKeys={[{
                    label: 'Amount Produced',
                    color: colors.primary.blue
                  }, {
                    label: 'Average',
                    color: colors.primary.grey
                  }, {
                    label: 'Production Goal',
                    color: colors.primary.green
                  }]}
                />
              }

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

};

SinglePeriod.defaultProps = {
  isFetching: {},
  updateAggregationSize: () => {}
};

SinglePeriod.propTypes = {
  production: PropTypes.array.isRequired
};

export default connect((store) => ({
  production: store.Dashboard.production,
  efficiency: store.Dashboard.efficiency,
  events: store.Dashboard.events,
  currentProduction: store.Dashboard.currentProduction,
  productionFlow: store.Dashboard.productionFlow,
  isFetching: store.Dashboard.isFetching
}), actions)(SinglePeriod);
