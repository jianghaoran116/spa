import { combineReducers } from 'redux';

import registerContent, * as registerAction from '../../components/register/index-redux';

export default combineReducers({
  registerContent,
});

export const actions = {
  ...registerAction,
};
