import React from 'react';
import { Switch, Route } from 'react-router-dom';

import RouterUtils from './RouterUtils';

const ChildRoutes = (props) => {
  if (props.match) {
    Object.keys(props.match.params).forEach((paramKey) => {
      RouterUtils.setParam(paramKey, props.match.params[paramKey]);
    });
    RouterUtils.setup();
  }
  const routes = (props.routes || []).map((route, index) => (
    <Route
      key={route.key || index}
      location={props.location}
      exact={route.exact}
      path={route.path}
      render={(routeProps) => <route.component {...props.passPropsToRoute} {...routeProps} {...route} />}
    />
  ));
  return (
    <Switch location={props.location}>
      {routes}
    </Switch>
  );
};

export default ChildRoutes;
