import { combineReducers } from 'redux';

// 引入 reducer 及 actionCreator
import list, * as noMatchAction from '../../components/404/index-redux';

export default combineReducers({
  list,
});

export const actions = {
  ...noMatchAction,
};
