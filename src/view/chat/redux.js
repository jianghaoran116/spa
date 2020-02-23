import { combineReducers } from 'redux';

import chat, * as chatAction from '../../components/chat/index-redux';

export default combineReducers({
  chat,
});

export const actions = {
  ...chatAction,
};
