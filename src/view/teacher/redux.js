import { combineReducers } from 'redux';

import list, * as teacherListAction from '../../components/teacher/list/index-redux';
import detail, * as teacherDetailAction from '../../components/teacher/detail/index-redux';

export default combineReducers({
  list,
  detail,
});

export const actions = {
  ...teacherListAction,
  ...teacherDetailAction,
};
