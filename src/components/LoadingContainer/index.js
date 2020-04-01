import React from 'react';
import ReactTimeout from 'react-timeout';

const defaultOptions = {
  time: 300,
  children: null
};

const LoadingContainer = (props) => {
  return (
    <div className={`async-container${props.isActive ? ' is-updating' : ''}`}>
      <div className="packiot-loading" />
      {props.children}
      {/* {this.state.isUpdatingData ?
      (isShift ? <TotalProductionChartShift {...this.props} /> : <TotalProductionChart {...this.props} />)
      :
      (this.state.errorRequest['productionData'] && !this.state.isUpdatingData) ?
        <div className="component-error">
          <div className="component-error-icon" />
          <span className="component-error-info">{'Oops something went wrong. Please try again later.'}</span>
        </div>
        : ((!(this.props.productionData || []).length || isCustomRangeViewMonthly) && !this.state.errorRequest['productionData'] && !this.state.isUpdatingData) ?
          <div className="component-error">
            <div className="component-error-icon" />
            <span className="component-error-info">{'No data to Show, please select another period.'}</span>
          </div>
          : (isShift ? <TotalProductionChartShift {...this.props} /> : <TotalProductionChart {...this.props} />)
    } */}
    </div>
  );
};

export function withLoadingContainer(Component, options = defaultOptions) {

  class LoadingContainerWrapper extends React.Component {

    constructor(props) {
      super(props);
      this.state = { isActive: true };
    }

    componentDidMount() {
      this.props.setTimeout(() => {
        this.setState({ isActive: false });
      }, options.time);
    }

    componentWillUnmount() {
      this.setState({ isActive: true });
    }

    render() {
      return (
        <React.Fragment>
          <LoadingContainer isActive={this.state.isActive}>{options.children}</LoadingContainer>
          <Component {...this.props} />
        </React.Fragment>
      );
    }

  };

  LoadingContainerWrapper.displayName = `LoadingContainerWrapper(${getDisplayName(Component)})`;

  return ReactTimeout(LoadingContainerWrapper);

};

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
};

export default LoadingContainer;
