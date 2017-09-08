import { message } from 'antd';

import actionCreator from '../utils/actionCreator';
import api from '../utils/api';

const gradingAction = actionCreator('grading');

const GET_STAGE_ONE_LIST = gradingAction('GET_STAGE_ONE_LIST', true);
const GET_STAGE_ONE_ITEM = gradingAction('GET_STAGE_ONE_ITEM', true);

const initialState = {
  isLoadingList: true,
  lists: [],
  item: {},
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_STAGE_ONE_LIST.RESOLVED:
      return {
        ...state,
        isLoadingList: false,
        lists: action.data
      };
    case GET_STAGE_ONE_ITEM.RESOLVED:
      return {
        ...state,
        item: action.data
      }
    default: return state;
  }
}

export const actions = {
  getStageOneList: () => ({
    type: GET_STAGE_ONE_LIST,
    promise: api.get('/grading/stage-one')
  }),
  getStageOneItem: (id) => ({
    type: GET_STAGE_ONE_ITEM,
    promise: api.get(`/grading/stage-one/${id}`)
  }),
};
