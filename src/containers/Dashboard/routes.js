import TotalProduction from './containers/TotalProduction';
import SinglePeriod from './containers/SinglePeriod';
import Scrap from './containers/Scrap';
import EfficiencyProgress from './containers/EfficiencyProgress';
import ProductionFlow from './containers/ProductionFlow';

const routes = [{
  name: 'Total Production',
  path: '/app/:companyId/analytics/dashboard/:sector/:timeRange/:component?/:componentId?/total-production/:aggregationSize?',
  component: TotalProduction
}, {
  name: 'Single Period',
  path: '/app/:companyId/analytics/dashboard/:sector/:timeRange/:component?/:componentId?/single-period/:aggregationSize?',
  component: SinglePeriod
}, {
  name: 'Scrap',
  path: '/app/:companyId/analytics/dashboard/:sector/:timeRange/:component?/:componentId?/scrap/:aggregationSize?',
  component: Scrap
}, {
  name: 'Production Flow',
  path: '/app/:companyId/analytics/dashboard/:sector/:timeRange/:component?/:componentId?/production-flow/:aggregationSize?',
  component: ProductionFlow
}, {
  name: 'Efficiency Progress',
  path: '/app/:companyId/analytics/dashboard/:sector/:timeRange/:component?/:componentId?/efficiency-progress/:aggregationSize?',
  component: EfficiencyProgress
}];


export default routes;
