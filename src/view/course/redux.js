import { combineReducers } from 'redux';

import list, * as courseListAction from '../../components/course/list/index-redux';
import detail, * as courseDetailAction from '../../components/course/detail/index-redux';

export default combineReducers({
  list,
  detail,
});

export const actions = {
  ...courseListAction,
  ...courseDetailAction,
};
