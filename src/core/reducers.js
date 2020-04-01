import { combineReducers } from 'redux';

import AppWrapper from '../containers/AppWrapper/reducer';
import Dashboard from '../containers/Dashboard/reducer';
import Settings from '../containers/Settings/reducer';

export default combineReducers({
  app: AppWrapper,
  Dashboard: Dashboard,
  Settings: Settings
});
