import axios from '../base/axios';
import ioUri from '../../config';

const detailUri = ioUri.detail;
console.log(detailUri.content);

const initialState = {
  loading: true,
  content: [],
};

const LOAD_ARTICLES = 'LOAD_ARTICLES';
const SET_CONTENT = 'SET_CONTENT';

export function loadArticles(data) {
  return {
    type: LOAD_ARTICLES,
    playload: data,
  };
}

export default function detailContent(state = initialState, action) {
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

    default:
      return state;
  }
}

function queryContent() {
  try {
    const reqconfig = {
      method: 'GET',
      url: `${detailUri.content}`,
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

export function getContent() {
  return async (dispatch) => {
    const { data: content } = await queryContent();
    if (content) {
      dispatch(setContent(content));
    }
  };
}

export function showSek() {
  return () => new Promise((reject) => {
    setTimeout(() => {
      reject();
    }, 1000);
  });
}
