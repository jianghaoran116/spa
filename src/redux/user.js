/**
 * @file 用户信息的ruedux
 * @author haoran
 */
import { combineReducers } from 'redux';
import axios from '../components/base/axios';
// import utils from '../utils';
import ioUri from '../config';
// import baseConfig from '../../config';

// const { getRedirectPath } = utils;

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const LOGOUT = 'LOGOUT';

const initState = {
  redirectTo: '', // 该去哪个页面
  msg: '', // 报错信息
  user: '',
  type: '',
  token: '',
};

// reducer
export function userContent(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        msg: '',
        // redirectTo: getRedirectPath(action.payload),
        redirectTo: '/boss',
        token: action.payload,
      };
    case LOAD_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case ERROR_MSG:
      return {
        ...state,
        isAuth: false,
        msg: action.msg,
      };
    case LOGOUT:
      return {
        ...initState,
        redirectTo: '/login',
        token: '',
      };
    default:
      return state;
  }
}

function authSuccess(data) {
  return {
    type: AUTH_SUCCESS,
    payload: data,
  };
}

function errorMsg(msg) {
  return {
    msg,
    type: ERROR_MSG,
  };
}

export function loadData(userinfo) {
  return {
    type: LOAD_DATA,
    payload: userinfo,
  };
}

export function update(data) {
  return (dispatch) => {
    axios.post('api/user/update', data)
      .then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data));
        } else {
          dispatch(errorMsg(res.data.msg));
        }
      });
  };
}
export function login({ user, pwd }) {
  return (dispatch) => {
    if (!user || !pwd) {
      dispatch(errorMsg('用户名和密码必须输入'));
      return false;
    }
    axios.post(`${ioUri.user.login}`, { userName: user, password: pwd })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          if (res.data.status === 200) {
            console.log(res.data.data.CurrentUser.authToken);
            // baseConfig.io['x-auth-token'] = res.data.data.CurrentUser.authToken;
            localStorage.setItem('token', res.data.data.CurrentUser.authToken);
            dispatch(authSuccess(res.data.data.CurrentUser.authToken));
          } else {
            dispatch(errorMsg('用户名或密码错误'));
          }
        } else {
          dispatch(errorMsg('网络错误'));
        }
      });
    return true;
  };
}

export function regisger({
  user, pwd, repeatpwd, type,
}) {
  if (!user || !pwd || !type) {
    return errorMsg('用户名密码必须输入');
  }
  if (pwd !== repeatpwd) {
    return errorMsg('密码和确认密码不同');
  }
  return (dispatch) => {
    axios.post('/api/user/register', { user, pwd, type })
      .then((res) => {
        console.log(res);
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess({ user, pwd, type }));
        } else {
          dispatch(errorMsg(res.data.msg));
        }
      });
  };
}

export function logoutSubmit() {
  return { type: LOGOUT };
}

export default combineReducers({
  userContent,
});

export const actions = {
  loadData,
  update,
  login,
  regisger,
  logoutSubmit,
};
