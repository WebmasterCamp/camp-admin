import { message } from 'antd';

import actionCreator from '../utils/actionCreator';
import api from '../utils/api';

const affiliateAction = actionCreator('affiliate');

const GET_AFFILIATE = affiliateAction('GET_AFFILIATE', true);
const APPROVE_ITEM = affiliateAction('APPROVE_ITEM', true);

const initialState = {
  isLoading: true,
  approvedAffiliate: [],
  unapprovedAffiliate: [],
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_AFFILIATE.RESOLVED:
      const approvedAffiliate = action.data.filter(item => item.approved);
      const unapprovedAffiliate = action.data.filter(item => !item.approved);
      return {
        ...state,
        approvedAffiliate,
        unapprovedAffiliate,
        isLoading: false,        
      };
    case APPROVE_ITEM.PENDING:
      return {
        ...state,
        isLoading: true,
      }
    default: return state;
  }
}

export const actions = {
  getAffiliate: () => ({
    type: GET_AFFILIATE,
    promise: api.get('/affiliates')
  }),
  approveAffiliateItem: id => dispatch => ({
    type: APPROVE_ITEM,
    promise: api.put(`/affiliates/${id}/approved`, { approved: true })
      .then(dispatch(actions.getAffiliate()))
      .then(() => message.success('Affiliate item has been approved.'))
  }),
  unapproveAffiliateItem: id => dispatch => ({
    type: APPROVE_ITEM,
    promise: api.put(`/affiliates/${id}/approved`, { approved: false })
      .then(dispatch(actions.getAffiliate()))
      .then(() => message.success('Affiliate item has been unapproved.'))
  }),
  deleteAffiliateItem: id => dispatch => ({
    type: APPROVE_ITEM,
    promise: api.delete(`/affiliates/${id}`)
      .then(dispatch(actions.getAffiliate()))
      .then(() => message.success('Affiliate item has been delete.'))
  }),
};
