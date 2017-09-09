import { message } from 'antd';

import actionCreator from '../utils/actionCreator';
import api from '../utils/api';

const gradingAction = actionCreator('grading');

const GET_STAGE_ONE_LIST = gradingAction('GET_STAGE_ONE_LIST', true);
const GET_STAGE_ONE_ANSWERS = gradingAction('GET_STAGE_ONE_ANSWERS', true);
const GRADE_STAGE_ONE_ITEM = gradingAction('GRADE_STAGE_ONE_ITEM', true);

const initialState = {
  isLoadingList: true,
  lists: [],
  answers: [],
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_STAGE_ONE_LIST.RESOLVED:
      return {
        ...state,
        isLoadingList: false,
        lists: action.data
      };
    case GET_STAGE_ONE_ANSWERS.RESOLVED:
      return {
        ...state,
        answers: action.data
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
    type: GET_STAGE_ONE_ANSWERS,
    promise: api.get(`/grading/stage-one/${id}`)
  }),
  gradeStageOneItem: (id, pass, note) => ({
    type: GRADE_STAGE_ONE_ITEM,
    promise: api.put(`/grading/stage-one/${id}`, { pass, note }),
    success: 'Grading Successfully',
    error: 'Grading Fail',
  })
};
