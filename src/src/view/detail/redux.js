import { combineReducers } from 'redux';

// 引入 reducer 及 actionCreator
import detailContent, * as detailAction from '../../components/detail/index-redux';

export default combineReducers({
  detailContent,
});

export const actions = {
  ...detailAction,
};
