import { combineReducers } from 'redux';

import loginContent, * as loginAction from '../../components/login/index-redux';

export default combineReducers({
  loginContent,
});

export const actions = {
  ...loginAction,
};
