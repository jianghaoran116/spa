// import axios from '../../base/axios';
// import ioUri from '../../../config';

// const courseUri = ioUri.course;

const PAGELOADSTATE = Symbol('PAGELOADSTATE');
const SET_COURSEDETAIL = Symbol('SET_COURSEDETAIL');

const $$initState = {
  loading: true,
  courseDetail: [],
};

export default function detailContent(state = $$initState, action) {
  switch (action.type) {
    case PAGELOADSTATE:
      return {
        ...state,
        loading: action.playload,
      };

    case SET_COURSEDETAIL:
      console.log(action);
      return {
        ...state,
        courseDetail: action.playload,
      };

    default:
      return state;
  }
}

export function loadCoursePage(data) {
  return {
    type: PAGELOADSTATE,
    playload: data,
  };
}

export function setCourseDetail(data) {
  return {
    type: SET_COURSEDETAIL,
    playload: data,
  };
}

// function queryCourseDetail() {
//   try {
//     const reqconfig = {
//       method: 'GET',
//       url: `${courseUri.list}?limit=1&offset=10`,
//     };
//     return axios(reqconfig);
//   } catch (err) {
//     return Promise.reject(err);
//   }
// }

export function getCourseDetailTask() {
  return async () => new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
}
