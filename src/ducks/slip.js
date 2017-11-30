import actionCreator from '../utils/actionCreator';
import api from '../utils/api';

const slipActions = actionCreator('slip');

const GET_SLIPS = slipActions('GET_SLIPS', true);
const UPDATE_SLIP_STATE = slipActions('UPDATE_SLIP_STATE', true);

const initialState = {
  loading: true,
  data: []
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_SLIPS.RESOLVED:
      return {
        ...state,
        data: action.data,
        loading: false
      };
    default: return state;
  }
};

export const actions = {
  getSlips: () => ({
    type: GET_SLIPS,
    promise: api.get('/finalists/slip')
  }),
  updateSlipState: (id, isApprove) => ({
    type: UPDATE_SLIP_STATE,
    promise: api.post(`/finalists/slip/${id}/approve`, { isApprove })
  })
}