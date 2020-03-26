import axios from '../../base/axios';
import ioUri from '../../../config';

// const courseUri = ioUri.course;
const teacherUri = ioUri.teacher;
const uploadUri = ioUri.upload;

const PAGELOADSTATE = Symbol('PAGELOADSTATE');
const SET_ORIGINALCOURSEDETAIL = Symbol('SET_ORIGINALCOURSEDETAIL');
const SET_COURSEDETAIL = Symbol('SET_COURSEDETAIL');
const SET_TEACHERLIST = Symbol('SET_TEACHERLIST');

const $$initState = {
  loading: true,
  originalCourseDetail: {},
  courseDetail: {},
  uploadUri,
  teacherList: [],
};

export default function detailContent(state = $$initState, action) {
  switch (action.type) {
    case PAGELOADSTATE:
      return {
        ...state,
        loading: action.playload,
      };

    case SET_ORIGINALCOURSEDETAIL:
      return {
        ...state,
        originalCourseDetail: action.playload,
      };

    case SET_COURSEDETAIL:
      return {
        ...state,
        courseDetail: action.playload,
      };

    case SET_TEACHERLIST:
      console.log(action.playload);
      return {
        ...state,
        teacherList: action.playload,
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

export function setOriginalCourseDetail(data) {
  return {
    type: SET_ORIGINALCOURSEDETAIL,
    playload: data,
  };
}

export function setCourseDetail(data) {
  return {
    type: SET_COURSEDETAIL,
    playload: data,
  };
}

export function setTeacherList(data) {
  return {
    type: SET_TEACHERLIST,
    playload: data,
  };
}

function queryTeacherList() {
  try {
    const reqconfig = {
      method: 'GET',
      url: `${teacherUri.list}?limit=100&offset=1`,
    };
    return axios(reqconfig);
  } catch (err) {
    return Promise.reject(err);
  }
}

export function getTeacherListTask() {
  return async () => {
    const { data: listData } = await queryTeacherList();
    return new Promise((resolve, reject) => {
      if (listData.status === 200) {
        resolve(listData.data);
      } else {
        reject(listData);
      }
    });
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
