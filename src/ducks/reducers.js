import { combineReducers } from 'redux';

import auth from './auth';
import affiliate from './affiliate';
import overview from './overview';

export default combineReducers({
  auth,
  affiliate,
  overview
});
