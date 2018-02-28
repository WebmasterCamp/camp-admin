import actionCreator from '../utils/actionCreator'
import api from '../utils/api'

const userAction = actionCreator('user')

const GET_USERS = userAction('GET_USERS', true)
const GET_USER = userAction('GET_USER', true)

const initialState = {
  isLoading: true,
  userDetail: {},
  users: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS.RESOLVED:
      return {
        ...state,
        users: action.data,
        isLoading: false,
      }
    case GET_USER.RESOLVED:
      const userDetail = action.data
      return {
        ...state,
        userDetail,
        isLoading: true,
      }
    default:
      return state
  }
}

export const actions = {
  getUserList: () => ({
    type: GET_USERS,
    promise: api.get('/users'),
  }),
  getUser: id => dispatch => ({
    type: GET_USER,
    promise: api.get(`/user/${id}`),
  }),
}
