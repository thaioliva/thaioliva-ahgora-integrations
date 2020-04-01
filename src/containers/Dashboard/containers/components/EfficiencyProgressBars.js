import React from 'react';
import PropTypes from 'prop-types';

// Components
import LoadingContainer from 'components/LoadingContainer';
import Grid from 'components/Grid';
import SingleBarChart from 'lib/dataComponents/SingleBarChart';

// Utils
import dataHelpers from 'lib/dataHelpers';
// Constants
import { colors } from 'core/constants';
const EfficiencyProgressBars = (props) => {
  return (
    <React.Fragment>

      <div style={{ height: 20 }} />
      <Grid>
        <Grid.Col>

          <LoadingContainer isActive={props.isFetching.production}>
            <SingleBarChart
              chartData={props.efficiencyProgress}
              color={colors.primary.blue}
              dataKey="avg_production_order"
              referenceLines={[{
                y: null,
                stroke: '#34C888'
              }, {
                y: null,
                strokeDasharray: '2 3',
                stroke: '#888F9D'
              }]}
              tooltipCards={['averageProductionOrderTootip']}
              legendKeys={[{
                label: 'Average Production Order',
                color: colors.primary.blue
              }]}
            />
          </LoadingContainer>

        </Grid.Col>
        <Grid.Col>

          <LoadingContainer isActive={props.isFetching.production}>
            <SingleBarChart
              chartData={props.efficiencyProgress}
              color={colors.primary.blue}
              dataKey="cnt_production_order"
              referenceLines={[{
                y: null,
                stroke: '#34C888'
              }, {
                y: null,
                strokeDasharray: '2 3',
                stroke: '#888F9D'
              }]}
              tooltipCards={['cntProductionOrderTootip']}
              legendKeys={[{
                label: 'Setups',
                color: colors.primary.blue
              }]}
            />
          </LoadingContainer>

        </Grid.Col>
      </Grid>

    </React.Fragment>
  );
};

EfficiencyProgressBars.defaultProps = {
  isFetching: {},
  oee: []
};

EfficiencyProgressBars.propTypes = {
  isFetching: PropTypes.object,
  oee: PropTypes.array
};

export default EfficiencyProgressBars;
