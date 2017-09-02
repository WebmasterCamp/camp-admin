import { combineReducers } from 'redux';

import auth from './auth';
import affiliate from './affiliate';

export default combineReducers({
  auth,
  affiliate
});
