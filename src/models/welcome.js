import welcomeService from '../services/welcome';

export default {
  namespace: 'welcome',
  state: {
    list: [],
    searchedStaffs:{}
  },
  effects: {
    *search({ payload = {} }, { call, put }) {
      const data = yield call(welcomeService.search, payload);
      yield put({
        type: 'saveSearchedStaffs',
        payload: data,
      });
    },
  }, // end of effects

  reducers: {
    saveSearchedStaffs(state, { payload }) {
      return {
        ...state,
        searchedStaffs: payload,
      };
    },
  },
};
