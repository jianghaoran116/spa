import axios from '../../base/axios';
import ioUri from '../../../config';

const courseUri = ioUri.course;

const PAGELOADSTATE = Symbol('PAGELOADSTATE');
const SET_COURSELIST = Symbol('SET_COURSELIST');
const SET_SELECTEDCOURSE = Symbol('SET_SELECTEDCOURSE');

const $$initState = {
  loading: true,
  courseList: [],
  selectedCourse: {},
};

export default function detailContent(state = $$initState, action) {
  switch (action.type) {
    case PAGELOADSTATE:
      return {
        ...state,
        loading: action.playload,
      };

    case SET_COURSELIST:
      return {
        ...state,
        courseList: action.playload,
      };

    case SET_SELECTEDCOURSE:
      return {
        ...state,
        selectedCourse: action.playload,
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

export function setCourseList(data) {
  console.log(data);
  return {
    type: SET_COURSELIST,
    playload: data,
  };
}

function queryCourseList() {
  try {
    const reqconfig = {
      method: 'GET',
      url: `${courseUri.list}?limit=100&offset=1`,
    };
    return axios(reqconfig);
  } catch (err) {
    return Promise.reject(err);
  }
}

export function getCourseListTask() {
  return async () => {
    const { data: listData } = await queryCourseList();
    return new Promise((resolve, reject) => {
      if (listData.status === 200) {
        console.log(listData.data);
        resolve(listData.data);
      } else {
        reject(listData);
      }
    });
  };
}

export function setSelectedCourse(data) {
  console.log(data);
  return {
    type: SET_SELECTEDCOURSE,
    playload: data,
  };
}
