import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import * as actions from '../../actions';

// Components
import Events from 'lib/dataComponents/Events';
import ProductionFlow from './components/FlowSection';
import LoadingContainer from 'components/LoadingContainer';
import Grid from 'components/Grid';
import NoData from 'lib/dataComponents/components/NoData';

// Utils
import compareParams from 'utils/compareParams';

export class LinesComponents extends React.PureComponent {
  render() {
    const isShift = this.props.match.params.sector === 'shift';
    const isAllLines = this.props.match.params.componentId === 'ALL';
    return (
      <Grid>
        <Grid.Col>
          <LoadingContainer isActive={this.props.isFetching.productionFlow}>
            <div style={{ height: 40 }} />
            {/* {isDay && isAllLines ? <Events {...this.props} /> : null} */}
            {!isAllLines && !isShift
              ? <ProductionFlow {...this.props} />
              : <NoData />
            }
          </LoadingContainer>
        </Grid.Col>
      </Grid>
    );
  }
}

LinesComponents.defaultProps = {
  fetchFlowSection: () => { },
  constant: () => { }
};

LinesComponents.propTypes = {
  fetchFlowSection: PropTypes.func,
  constant: PropTypes.func
};

export default connect((store) => ({
  productionFlow: store.Dashboard.productionFlow,
  currentProduction: store.Dashboard.currentProduction,
  isFetching: store.Dashboard.isFetching
}), actions)(LinesComponents);