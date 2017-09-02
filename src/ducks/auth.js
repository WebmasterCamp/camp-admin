import actionCreator from '../utils/actionCreator';
import api from '../utils/api';

const authAction = actionCreator('auth');

const LOGIN = authAction('LOGIN', true);
const GET_USER_DATA = authAction('GET_USER_DATA', true);

const initialState = {
  isLoggedIn: false,
  isLoggingIn: false,
  isCheckedUser: false,
  user: {}
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_USER_DATA.RESOLVED:
      return {
        isLoggedIn: true,
        user: action.data,
        isCheckedUser: true,
      };
    case GET_USER_DATA.REJECTED:
      return {
        isLoggedIn: false,
        isCheckedUser: true
      }
    case LOGIN.PENDING:
      return {
        ...state,
        isLoggingIn: true,
      };
    case LOGIN.RESOLVED:
      return {
        ...state,
        isLoggedIn: true,
        isLoggingIn: false,
        user: action.data
      };
    default: return state;
  }
}

export const actions = {
  checkUser: () => ({
    type: GET_USER_DATA,
    promise: api.get('/admin/me')
  }),
  login: (username, password) => ({
    type: LOGIN,
    promise: api.post('/auth/login/admin', { username, password })
      .then(({ data: { token } }) => window.localStorage.setItem('ywc15AdminToken', token))
      .then(() => api.get('/admin/me'))
  }),
};
