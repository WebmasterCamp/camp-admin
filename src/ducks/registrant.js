import actionCreator from '../utils/actionCreator';
import api from '../utils/api';

const registrantAction = actionCreator('registrant');

const GET_REGISTRANTS = registrantAction('GET_REGISTRANTS', true);
const GET_REGISTRANT = registrantAction('GET_REGISTRANT', true);

const initialState = {
  isLoading: true,
  isRegistrantLoading: true,
  registrant: {},
  registrants: [],
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_REGISTRANTS.PENDING:
      return {
        ...state,
        registrants: [],
        isLoading: true,        
      };
    case GET_REGISTRANTS.RESOLVED:
      return {
        ...state,
        registrants: action.data,
        isLoading: false,        
      };
    case GET_REGISTRANT.PENDING:
      return {
        ...state,
        registrant: {},
        isRegistrantLoading: true,
      }
    case GET_REGISTRANT.RESOLVED:
      return {
        ...state,
        registrant: action.data,
        isRegistrantLoading: false,
      }
    default: return state;
  }
}

export const actions = {
  getRegistrantList: () => ({
    type: GET_REGISTRANTS,
    promise: api.get('/users')
  }),
  getRegistrant: id  => ({
    type: GET_REGISTRANT,
    promise: api.get(`/users/${id}`)
  }),
};
