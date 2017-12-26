import actionCreator from '../utils/actionCreator';
import api from '../utils/api';

const registrantAction = actionCreator('score');

const UPDATE_SCORE = registrantAction('UPDATE_SCORE', true);

const initialState = {
  saving: false,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_SCORE.PENDING:
      return {
        ...state,
        saving: true
      };
    case UPDATE_SCORE.RESOLVED:
      return {
        ...state,
        saving: false
      };
    default: return state;
  }
};

export const actions = {
  updateScore: (score, team) => ({
    type: UPDATE_SCORE,
    promise: api.post(`/scores/${team}`, { score }),
    success: 'Score has been update',
    error: 'Unable to update score'
  })
};
