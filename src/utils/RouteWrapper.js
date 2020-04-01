import React from 'react';
import PropTypes from 'prop-types';
import ChildRoutes from 'utils/ChildRoutes';

const RouteWrapper = (props) => {
  if (props.beforeReturn) props.beforeReturn(props);
  return <ChildRoutes {...props} />;
};

RouteWrapper.defaultProps = {
  beforeReturn: null
};

RouteWrapper.propTypes = {
  beforeReturn: PropTypes.func
};

export default RouteWrapper;
