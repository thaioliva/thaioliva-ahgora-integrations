import React from 'react';
import PropTypes from 'prop-types';

// Components
import LoadingContainer from 'components/LoadingContainer';
import Grid from 'components/Grid';
import PieChart from 'lib/dataComponents/PieChart';

// Utils
import dataHelpers from 'lib/dataHelpers';

const ScrapAndEfficiency = (props) => { 
  return (
  <React.Fragment>

    <div style={{ height: 20 }} />

    <Grid>
      <Grid.Col>

        <LoadingContainer isActive={props.isFetching.production}>
          <PieChart
            title="Scrap"
            chartData={dataHelpers.scrapAndGoodParts(props.production)}
          />
        </LoadingContainer>

      </Grid.Col>
      <Grid.Col>

        <LoadingContainer isActive={props.isFetching.oee}>
          <PieChart
            title="Efficiency"
            chartData={dataHelpers.efficiency(props.efficiency)}
          />
        </LoadingContainer>

      </Grid.Col>
    </Grid>

  </React.Fragment>
)};

ScrapAndEfficiency.defaultProps = {
  isFetching: {}, 
  production: [],
  efficiency: [],
};

ScrapAndEfficiency.propTypes = {
  isFetching: PropTypes.object,
  production: PropTypes.array,
  efficiency: PropTypes.array
};

export default ScrapAndEfficiency;
