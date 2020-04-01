import React from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import Grid from 'components/Grid';
import Components from 'lib/Components';
import ViewTitle from 'lib/ViewTitle';
import ViewSelector from 'lib/ViewSelector';
import Tabs from 'lib/Tabs';

// Utils
import buildPath from 'utils/buildPath';
import RouterUtils from 'utils/RouterUtils';

const AnalyticsHOC = (Component, tabList = []) => {

  class Analytics extends React.Component {

    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {

      const params = RouterUtils.params;

      return (
        <React.Fragment>

          <div className="v-space-small" />

          <Components
            items={this.props.sectorList}
            activeKey={params.componentId}
            onSelect={this.handleSectorSelection.bind(this)}>
            <ViewSelector
              activeKey={params.view}
              onRefresh={this.handleRefresh.bind(this)}
              onSelect={this.handleSelectView.bind(this)}
            />
          </Components>

          <ViewTitle urlParams={{ ...params }} />

          <Grid>
            <Grid.Col>
              <Tabs items={tabList} activeSector={params.sector} activeKey={params.tab} onSelect={this.handleTabSelection.bind(this)} />
            </Grid.Col>
          </Grid>

          <Component
            {...this.state}
            {...this.props}
          />

        </React.Fragment>
      );
    }

    handleRefresh() {}

    handleSelectView(view) {
      this.props.history.push(buildPath({
        view: view.key,
        tab: view.homeTab
      }, this.props));
    }

    handleSectorSelection(component) {
      const params = RouterUtils.params;
      this.props.history.push(buildPath({ ...params, ...{ componentId: component.id } }, this.props));
    }

    handleTabSelection(tab) {
      const params = RouterUtils.params;
      this.props.history.push(buildPath({ ...params, ...{ tab: tab.key } }, this.props));
    }

    refreshData() {
      this.props.updateData();
    }
  };

  Analytics.defaultProps = {
    match: { params: {} }
  };

  function mapStateToProps(store) {
    return {
      sectorList: store.app.sectorList,
      targets: store.app.targets
    };
  }

  function mapDispatchToProps(dispatch) {
    return { ...bindActionCreators({}, dispatch) };
  }

  return connect(mapStateToProps, mapDispatchToProps)(Analytics);

};

export default AnalyticsHOC;
