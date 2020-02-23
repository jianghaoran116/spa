import axios from '../base/axios';

const initialState = {
  logined: false,
};

export default function loginContent(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const LOAD_ARTICLES = 'Test';

export function loadArticles(data) {
  return {
    types: LOAD_ARTICLES,
    playload: data,
  };
}

function queryData() {
  try {
    const reqconfig = {
      method: 'GET',
      url: '/api/user/info',
    };
    return axios(reqconfig);
  } catch (err) {
    return Promise.reject(err);
  }
}

export function getData() {
  return async () => {
    const { data } = await queryData();
    console.log(data);
  };
}
