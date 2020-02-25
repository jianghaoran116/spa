import { combineReducers } from 'redux';

import list, * as courseListAction from '../../components/course/list/index-redux';

export default combineReducers({
  list,
});

export const actions = {
  ...courseListAction,
};
