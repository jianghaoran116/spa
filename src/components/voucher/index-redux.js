import axios from '../base/axios';
import ioUri from '../../config';
import utils from '../../utils';

const detailUri = ioUri.voucher.detail;
console.log(detailUri.content);

const initialState = {
  loading: true,
  content: [],
  userToken: '',
  tenantId: '',
};

const LOAD_ARTICLES = 'LOAD_ARTICLES';
const SET_CONTENT = 'SET_CONTENT';
const SET_TOKEN = 'SET_TOKEN';
const SET_TENANTID = 'SET_TENANTID';

export function loadArticles(data) {
  return {
    type: LOAD_ARTICLES,
    playload: data,
  };
}

export default function voucherContent(state = initialState, action) {
  switch (action.type) {
    case LOAD_ARTICLES: {
      return {
        ...state,
        loading: action.playload,
      };
    }

    case SET_CONTENT: {
      return {
        ...state,
        content: action.playload,
      };
    }

    case SET_TOKEN: {
      return {
        ...state,
        userToken: action.playload,
      };
    }

    case SET_TENANTID: {
      return {
        ...state,
        tenantId: action.playload,
      };
    }

    default:
      return state;
  }
}

function queryContent() {
  try {
    const param = utils.formatSearch(window.location.href);
    const reqconfig = {
      method: 'GET',
      url: `${detailUri}?voucher=${param.voucher}&tenantId=${param.tenantId}&yhtUserId=${param.yhtUserId}`,
    };
    return axios(reqconfig);
  } catch (err) {
    return Promise.reject(err);
  }
}

export function setLoadState(data) {
  return {
    type: LOAD_ARTICLES,
    playload: data,
  };
}

function setContent(data) {
  return {
    type: SET_CONTENT,
    playload: data,
  };
}

function setToken(data) {
  return {
    type: SET_TOKEN,
    playload: data,
  };
}

function setTenantId(data) {
  return {
    type: SET_TENANTID,
    playload: data,
  };
}

export function getContent() {
  return async (dispatch) => {
    const param = utils.formatSearch(window.location.href);
    dispatch(setToken(param.yhtUserId));
    dispatch(setTenantId(param.tenantId));

    const { data: content } = await queryContent();
    if (content.success) {
      dispatch(setContent(content.data));
    } else {
      throw new Error('获取数据失败');
    }
  };
}
