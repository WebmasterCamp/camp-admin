import actionCreator from '../utils/actionCreator';
import api from '../utils/api';

const adminUserAction = actionCreator('adminUser');

const GET_ADMIN_USER = adminUserAction('GET_ADMIN_USER', true);
const CREATE_ADMIN_USER = adminUserAction('CREATE_ADMIN_USER', true);
const DELETE_ADMIN_USER = adminUserAction('DELETE_ADMIN_USER', true);

const initialState = {
  isLoading: true,
  users: []
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_ADMIN_USER.PENDING:
      return {
        ...state,
        users: [],
        isLoading: true
      }
    case GET_ADMIN_USER.RESOLVED:
      return {
        ...state,
        users: [...action.data],
        isLoading: false
      };
    default: return state;
  }
}

export const actions = {
  getAdminUser: () => ({
    type: GET_ADMIN_USER,
    promise: api.get('/admin')
  }),
  createAdminUser: (username, password, role) => ({
    type: CREATE_ADMIN_USER,
    promise: api.post('/admin', { username, password, role }),
    success: 'New Admin user has been create'
  }),
  deleteAdminUser: (id) => ({
    type: DELETE_ADMIN_USER,
    promise: api.delete(`/admin/${id}`),
    success: 'Admin user has been deleted.'
  })
};
