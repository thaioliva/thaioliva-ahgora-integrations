import AppWrapper from 'containers/AppWrapper';
import Dashboard from 'containers/Dashboard';
import dashboardRoutes from 'containers/Dashboard/routes';
import Settings from 'containers/Settings';

const routes = [{
  name: 'Dashboard',
  path: '/',
  exact: true,
  component: AppWrapper,
  routes: [{
    name: 'Dashboard',
    path: '/dashboard',
    component: Dashboard
  },
  {
    name: 'Settings',
    path: '/settings',
    component: Settings
  }]
}];

export default routes;
