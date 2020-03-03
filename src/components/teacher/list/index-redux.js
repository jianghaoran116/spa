import axios from '../../base/axios';
import ioUri from '../../../config';

const courseUri = ioUri.teacher;

const PAGELOADSTATE = Symbol('PAGELOADSTATE');
const SET_TEACHERLIST = Symbol('SET_TEACHERLIST');
const SET_SELECTEDTEACHER = Symbol('SET_SELECTEDTEACHER');

const $$initState = {
  loading: true,
  teacherList: [],
  selectedTeacher: {},
};

export default function teacherListContent(state = $$initState, action) {
  switch (action.type) {
    case PAGELOADSTATE:
      return {
        ...state,
        loading: action.playload,
      };

    case SET_TEACHERLIST:
      return {
        ...state,
        teacherList: action.playload,
      };

    case SET_SELECTEDTEACHER:
      return {
        ...state,
        selectedTeacher: action.playload,
      };

    default:
      return state;
  }
}

export function loadTeacherPage(data) {
  return {
    type: PAGELOADSTATE,
    playload: data,
  };
}

export function setTeacherList(data) {
  console.log(data);
  return {
    type: SET_TEACHERLIST,
    playload: data,
  };
}

function queryTeacherList() {
  try {
    const reqconfig = {
      method: 'GET',
      url: `${courseUri.list}?limit=0&offset=10`,
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
        console.log(listData.data);
        resolve(listData.data);
      } else {
        reject(listData);
      }
    });
  };
}

export function setSelectedTeacher(data) {
  console.log(data);
  return {
    type: SET_SELECTEDTEACHER,
    playload: data,
  };
}
