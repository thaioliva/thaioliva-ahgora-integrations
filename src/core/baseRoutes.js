// Components
import NotFoundRoute from 'containers/NotFoundRoute';
import RouteWrapper from 'utils/RouteWrapper';

// Routes
import appRoutes from 'containers/AppWrapper/routes';

const routes = [{
  component: RouteWrapper,
  routes: [{
    name: 'AppWrapper',
    path: '/',
    component: RouteWrapper,
    routes: appRoutes
  }, {
    path: '**',
    component: NotFoundRoute
  }]
}];

export default routes;
