import React from 'react';
import PropTypes from 'prop-types';

// Components
import LoadingContainer from 'components/LoadingContainer';
import Grid from 'components/Grid';
import PieChart from 'lib/dataComponents/PieChart';
import NoData from 'lib/dataComponents/components/NoData';
// Utils
import dataHelpers from 'lib/dataHelpers';

const Oee = (props) => (
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
          {props.oee.length
            ?
            <PieChart
              title="OEE"
              chartData={dataHelpers.oeeCalc(props.oee)}
              oee
            />
            : <NoData />
          }
        </LoadingContainer>

      </Grid.Col>
    </Grid>

  </React.Fragment>
);

Oee.defaultProps = {
  isFetching: {},
  production: [],
  oee: []
};

Oee.propTypes = {
  isFetching: PropTypes.object,
  production: PropTypes.array,
  oee: PropTypes.any
};

export default Oee;
