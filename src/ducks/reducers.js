import { combineReducers } from 'redux';

import auth from './auth';
import affiliate from './affiliate';
import overview from './overview';
import adminUser from './adminUser';
import grading from './grading';

export default combineReducers({
  auth,
  affiliate,
  overview,
  adminUser,
  grading
});
