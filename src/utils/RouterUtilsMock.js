import RouterUtils from './RouterUtils';

const routerProps = () => {

  RouterUtils.setConstant('isDay', (params) => params.timeRange === 'day');
  RouterUtils.setConstant('isWeek', (params) => params.timeRange === 'week');
  RouterUtils.setConstant('isMonth', (params) => params.timeRange === 'month');
  RouterUtils.setConstant('isCustomRange', (params) => !!params.timeRange.match('custom'));
  RouterUtils.setConstant('isAllLines', (params) => params.componentId === 'ALL');
  RouterUtils.setConstant('isOneLine', (params) => params.componentId !== 'ALL');

  const params = {
    companyId: 1,
    app: 'analytics',
    view: 'dashboard',
    sector: 'factory',
    timeRange: 'month',
    component: 'lines',
    componentId: 'ALL',
    tab: 'total-production',
    aggregationSize: 'day'
  };

  const props = {
    match: { params: params },
    history: {
      push: () => {},
      replace: () => {}
    },
    location: {}
  };

  Object.keys(params).forEach((paramKey) => {
    RouterUtils.setParam(paramKey, params[paramKey]);
  });

  RouterUtils.setup();

  return props;

};

export default routerProps;
