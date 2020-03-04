import axios from '../../base/axios';
import ioUri from '../../../config';

const courseUri = ioUri.teacher;

const PAGELOADSTATE = Symbol('PAGELOADSTATE');
const SET_TEACHERLIST = Symbol('SET_TEACHERLIST');
const SET_SELECTEDTEACHER = Symbol('SET_SELECTEDTEACHER');
const SET_TOTAL = Symbol('SET_TOTAL');
const SET_LIMIT = Symbol('SET_LIMIT');
const SET_OFFSET = Symbol('SET_OFFSET');

const $$initState = {
  loading: true,
  teacherList: [],
  selectedTeacher: {},
  total: 0,
  limit: 1,
  offset: 10,
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

    case SET_TOTAL:
      console.log(action.playload);
      return {
        ...state,
        total: action.playload,
      };

    case SET_LIMIT:
      return {
        ...state,
        limit: action.playload,
      };

    case SET_OFFSET:
      return {
        ...state,
        offset: action.playload,
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
  return {
    type: SET_TEACHERLIST,
    playload: data,
  };
}

export function setTotal(data) {
  return {
    type: SET_TOTAL,
    playload: data,
  };
}

export function setLimit(data) {
  return {
    type: SET_LIMIT,
    playload: data,
  };
}

export function setOffset(data) {
  return {
    type: SET_OFFSET,
    playload: data,
  };
}

function queryTeacherList(limit, offset) {
  try {
    const reqconfig = {
      method: 'GET',
      url: `${courseUri.list}?limit=${(limit - 1)}&offset=${(offset - 1)}`,
    };
    return axios(reqconfig);
  } catch (err) {
    return Promise.reject(err);
  }
}

export function getTeacherListTask() {
  return async (dispatch, getState) => {
    const { limit, offset } = getState().Teacher.list;
    const { data: listData } = await queryTeacherList(limit, offset);
    return new Promise((resolve, reject) => {
      if (listData.status === 200) {
        console.log(listData.total);
        dispatch(setTotal(listData.total));
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
