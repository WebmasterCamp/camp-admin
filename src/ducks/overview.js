import actionCreator from '../utils/actionCreator';
import api from '../utils/api';

const overviewAction = actionCreator('overview');

const GET_STAT = overviewAction('GET_STAT', true);

const initialState = {
  isLoading: true,
  stat: {
    programming: '-',
    design: '-',
    marketing: '-',
    content: '-',
    pending: '-',
    notConfirm: '-'
  }
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_STAT.RESOLVED:
      return {
        ...state,
        stat: action.data    
      };
    default: return state;
  }
}

export const actions = {
  getRegisterStat: () => ({
    type: GET_STAT,
    promise: api.get('/users/stat/all')
  }),
};
