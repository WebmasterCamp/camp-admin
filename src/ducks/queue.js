import actionCreator from '../utils/actionCreator';
import api from '../utils/api';

const queueAction = actionCreator('queue');

const GET_QUEUE = queueAction('GET_QUEUE', true);
const INCREASE_QUEUE = queueAction('INCREASE_QUEUE', true);

const initialState = {
  isLoading: false,
  isIncreasing: false,
  order: -1
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_QUEUE.PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_QUEUE.RESOLVED:
      return {
        ...state,
        isLoading: false,
        order: action.data.order
      };
    case GET_QUEUE.REJECTED:
      return {
        ...state,
        isLoading: false,
        order: -1
      };
    case INCREASE_QUEUE.PENDING:
      return {
        ...state,
        isIncreasing: true,
      };
    case INCREASE_QUEUE.RESOLVED:
      return {
        ...state,
        isIncreasing: false
      };
    default: return state;
  }
}

export const actions = {
  getQueue: (major) => ({
    type: GET_QUEUE,
    promise: api.get(`/queues/${major}`)
  }),
  increaseQueue: (major, isDecrease = false) => ({
    type: INCREASE_QUEUE,
    promise: api.post(`/queues/${major}`, { isDecrease })
  }),
};
