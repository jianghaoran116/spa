import { combineReducers } from 'redux';

// 引入 reducer 及 actionCreator
import voucherContent, * as voucherAction from '../../components/voucher/index-redux';

export default combineReducers({
  voucherContent,
});

export const actions = {
  ...voucherAction,
};
