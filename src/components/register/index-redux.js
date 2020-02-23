// import axios from '../base/axios';

const initialState = {
  logined: false,
};

export default function registerContent(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const LOAD_ARTICLES = 'Register';

export function loadArticles(data) {
  return {
    types: LOAD_ARTICLES,
    playload: data,
  };
}
