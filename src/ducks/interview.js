import actionCreator from '../utils/actionCreator';
import api from '../utils/api';

const interviewAction = actionCreator('interview');

const GET_INTERVIEWER = interviewAction('GET_INTERVIEWER', true);

const initialState = {
  isLoading: false,
  isError: false,
  interviewer: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_INTERVIEWER.PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case GET_INTERVIEWER.RESOLVED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        interviewer: action.data
      };
    case GET_INTERVIEWER.REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default: return state;
  }
}

export const actions = {
  getInterviewer: (refId) => ({
    type: GET_INTERVIEWER,
    promise: api.get(`/interview/${refId}`)
  })
};
