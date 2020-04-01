import PropTypes from 'prop-types';
import createRouterContext from 'react-router-test-context';

const routerContext = (Component) => {

  // Pass contextTypes and context to react-router
  Component.contextTypes = {
    router: PropTypes.object
  };

  const context = createRouterContext();

  return context;

};

export default routerContext;
