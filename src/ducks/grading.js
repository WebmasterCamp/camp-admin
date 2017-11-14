import actionCreator from '../utils/actionCreator';
import api from '../utils/api';

const gradingAction = actionCreator('grading');

const GET_STAGE_ONE_LIST = gradingAction('GET_STAGE_ONE_LIST', true);
const GET_STAGE_ONE_ANSWERS = gradingAction('GET_STAGE_ONE_ANSWERS', true);
const GRADE_STAGE_ONE_ITEM = gradingAction('GRADE_STAGE_ONE_ITEM', true);

const GET_STAGE_TWO_LIST = gradingAction('GET_STAGE_TWO_LIST', true);
const GET_STAGE_TWO_ANSWERS = gradingAction('GET_STAGE_TWO_ANSWERS');
const GRADE_STAGE_TWO_ITEM = gradingAction('GRADE_STAGE_TWO_ITEM', true);

const GET_MAJOR_LIST = gradingAction('GET_MAJOR_LIST', true);
const GET_MAJOR_ANSWERS = gradingAction('GET_MAJOR_ANSWERS', true);
const GRADE_MAJOR_ITEM = gradingAction('GRADE_MAJOR_ITEM', true);
const LOAD_CANDIDATE_COUNT = gradingAction('LOAD_CANDIDATE_COUNT', true);

const GET_GRADING_STATUS = gradingAction('GET_GRADING_STATUS', true);

const initialState = {
  isLoadingList: true,
  lists: [],
  answers: [],
  note: '',
  isLoadingItem: false,
  selectedItem: {},
  isLoadingStat: true,
  stat: {},
  candidateCount: 0,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_STAGE_ONE_LIST.RESOLVED:
      return {
        ...state,
        isLoadingList: false,
        lists: action.data,
        note: ''
      };
    case GET_STAGE_ONE_ANSWERS.PENDING:
      return {
        ...state,
        isLoadingItem: true,
        answers: [],
        note: ''
      };
    case GET_STAGE_ONE_ANSWERS.RESOLVED:
      return {
        ...state,
        answers: action.data.answers,
        note: action.data.note ? action.data.note.note : '',
        activities: action.data.activities,
        isLoadingItem: false
      };
    case GET_STAGE_TWO_LIST.RESOLVED:
      return {
        ...state,
        isLoadingList: false,
        lists: action.data,
        note: ''
      };
    case GET_STAGE_TWO_ANSWERS:
      return {
        ...state,
        selectedItem: action.index === -1 ? {} : state.lists[action.index]
      };
    case GET_GRADING_STATUS.PENDING:
      return {
        ...state,
        isLoadingStat: true
      };
    case GET_GRADING_STATUS.RESOLVED:
      return {
        ...state,
        isLoadingStat: false,
        stat: action.data
      };
    case GET_MAJOR_LIST.RESOLVED:
      return {
        ...state,
        isLoadingList: false,
        lists: action.data,
        note: ''
      }
    case GET_MAJOR_ANSWERS.PENDING:
      return {
        ...state,
        isLoadingItem: true,
        answers: [],
        note: ''
      };
    case GET_MAJOR_ANSWERS.RESOLVED:
      return {
        ...state,
        answers: action.data.answers,
        note: action.data.note ? action.data.note.note : '',
        activities: action.data.activities,
        academicYear: action.data.academicYear,
        faculty: action.data.faculty,
        department: action.data.department,
        university: action.data.university,
        isLoadingItem: false
      };
    case LOAD_CANDIDATE_COUNT.RESOLVED:
      return {
        ...state,
        candidateCount: action.data.count
      };
    default: return state;
  }
}

export const actions = {
  getStageOneList: () => ({
    type: GET_STAGE_ONE_LIST,
    promise: api.get('/grading/stage-one'),
    error: "Fail to load list, If it's happen again please contact staff"
  }),
  getStageOneItem: (id) => ({
    type: GET_STAGE_ONE_ANSWERS,
    promise: api.get(`/grading/stage-one/${id}`),
    error: "Fail to load item, If it's happen again please contact staff"
  }),
  gradeStageOneItem: (id, pass, note) => ({
    type: GRADE_STAGE_ONE_ITEM,
    promise: api.put(`/grading/stage-one/${id}`, { pass, note }),
    success: 'Grading Successfully',
    error: "Grading fail, If it's happen again please contact staff"
  }),
  getStageTwoList: () => ({
    type: GET_STAGE_TWO_LIST,
    promise: api.get('/grading/stage-two'),
    error: "Fail to load list, If it's happen again please contact staff"
  }),
  getStageTwoItem: (index) => ({
    type: GET_STAGE_TWO_ANSWERS,
    index
  }),
  gradeStageTwoItem: (id, pass, note) => ({
    type: GRADE_STAGE_TWO_ITEM,
    promise: api.put(`/grading/stage-two/${id}`, { pass, note }),
    success: 'Grading Successfully',
    error: "Grading fail, If it's happen again please contact staff"
  }),
  loadGradingStatus: () => ({
    type: GET_GRADING_STATUS,
    promise: Promise.all([
      api.get('/grading/stage-one/stat'),
      api.get('/grading/stage-two/stat'),
      api.get('/grading/major/programming/stat'),
      api.get('/grading/major/design/stat'),
      api.get('/grading/major/marketing/stat'),
      api.get('/grading/major/content/stat'),
      api.get('/grading/criteria-analyze')
    ])
    .then(([
      { data: stageOne },
      { data: stageTwo },
      { data: programming },
      { data: design },
      { data: marketing },
      { data: content },
      { data: interviewEstimation }
    ]) => ({
      data: { stageOne, stageTwo, programming, design, marketing, content, interviewEstimation }
    })),
    error: 'Fail to load grading status'
  }),
  getMajorList: (major) => ({
    type: GET_MAJOR_LIST,
    promise: api.get(`/grading/major/${major}`),
    error: "Fail to load list, If it's happen again please contact staff"
  }),
  getMajorItem: (major, id) => ({
    type: GET_MAJOR_ANSWERS,
    promise: api.get(`/grading/major/${major}/${id}`),
    error: "Fail to load item, If it's happen again please contact staff"
  }),
  gradeMajorItem: (major, id, pass, note) => ({
    type: GRADE_MAJOR_ITEM,
    promise: api.put(`/grading/major/${major}/${id}`, { pass, note }),
    success: 'Grading Successfully',
    error: "Grading fail, If it's happen again please contact staff"
  }),
  getCandidateCount: (major) => ({
    type: LOAD_CANDIDATE_COUNT,
    promise: api.get(`/grading/major/${major}/pass-stat`)
  })
};
