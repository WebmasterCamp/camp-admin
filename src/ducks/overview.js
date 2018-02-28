import actionCreator from '../utils/actionCreator'
import api from '../utils/api'

const overviewAction = actionCreator('overview')

const GET_STAT = overviewAction('GET_STAT', true)

const initialState = {
  isLoading: true,
  stat: {
    programming: '-',
    design: '-',
    marketing: '-',
    content: '-',
    pending: '-',
    notConfirm: '-',
  },
  byDayStat: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STAT.RESOLVED:
      return {
        ...state,
        stat: action.data[0],
        byDayStat: action.data[1],
      }
    default:
      return state
  }
}

export const actions = {
  getRegisterStat: () => ({
    type: GET_STAT,
    promise: Promise.all([
      api.get('/users/stat/all'),
      api.get('/users/by-day-stat'),
    ]).then(res => ({ data: res.map(obj => obj.data) })),
  }),
}
