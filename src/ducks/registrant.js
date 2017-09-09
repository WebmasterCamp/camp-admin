import { message } from 'antd';

import actionCreator from '../utils/actionCreator';
import api from '../utils/api';

const registrantAction = actionCreator('registrant');

const GET_REGISTRANTS = registrantAction('GET_REGISTRANTS', true);
const GET_REGISTRANT = registrantAction('GET_REGISTRANT', true);

const initialState = {
  isLoading: true,
  registrantDetail: {},
  webProgrammingRegistrantList: [],
  webContentRegistrantList: [],
  webDesignRegistrantList: [],
  webMarkingRegistrantList: [],
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_REGISTRANTS.RESOLVED:
      const webProgrammingRegistrantList = action.data; //.filter(item => item.id == 1);
      const webContentRegistrantList = action.data.filter(item => item.major == "content");
      const webDesignRegistrantList = action.data.filter(item => item.major == "design");
      const webMarkingRegistrantList = action.data.filter(item => item.major == "marketing");
      return {
        ...state,
        webProgrammingRegistrantList,
        webContentRegistrantList,
        webDesignRegistrantList,
        webMarkingRegistrantList,
        isLoading: false,        
      };
    case GET_REGISTRANT.RESOLVED:
      const registrantDetail = action.data;
      return {
        ...state,
        registrantDetail,
        isLoading: true,
      }
    default: return state;
  }
}

export const actions = {
  getRegistrantList: () => ({
    type: GET_REGISTRANTS,
    promise: api.get('/users/stat/all')
  }),
  getRegistrant: id => dispatch => ({
    type: GET_REGISTRANT,
    promise: api.get(`/registrant/${id}`)
  }),
};
