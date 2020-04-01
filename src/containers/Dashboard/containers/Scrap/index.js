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

import ShiftChart from 'lib/ScrapChartShifts';

// Constants
import { colors } from 'core/constants';

// Utils
import dataHelpers from 'lib/dataHelpers';
import { rawNumber } from 'utils/utilsFn';

import shiftsMock from '../components/shiftsMock';

export class TotalProduction extends React.PureComponent {

  render() {

    // Save isFetching prop
    const isFetching = this.props.isFetching;

    let scrapData = this.props.production.concat();

    scrapData = scrapData.map(((item) => {
      item.calculatedScrap = rawNumber(dataHelpers.calculatedScrap(item));
      item.scrapReference = dataHelpers.scrapReference(item);
      return item;
    }));

    // The reference lines use the same values repeated all over the chartData array
    const reference = scrapData[0];
    const referenceValue = reference ? reference.scrapReference : null;

    const isShift = this.props.match.params.sector === 'shift';

    let chartArray = [...scrapData];

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
                  dataKey="calculatedScrap"
                  color={colors.primary.red}
                  referenceLines={[{
                    y: rawNumber(referenceValue),
                    strokeDasharray: '2 3',
                    stroke: '#888F9D'
                  }]}
                  isPercentage
                  tooltipCards={['calculatedScrap', 'periodProduction']}
                  legendKeys={[{
                    label: 'Scrap',
                    color: colors.primary.red
                  }, {
                    label: 'Average',
                    color: colors.primary.grey
                  }]}
                />
              }

            </LoadingContainer>

          </Grid.Col>
        </Grid>

      </React.Fragment>
    );
  }

  handleAggregationSize({ target }) {
    this.props.updateAggregationSize(target.value);
  }

};

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
  events: store.Dashboard.events,
  currentProduction: store.Dashboard.currentProduction,
  productionFlow: store.Dashboard.productionFlow,
  isFetching: store.Dashboard.isFetching
}), actions)(TotalProduction);
