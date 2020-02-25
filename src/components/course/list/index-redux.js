import axios from '../../base/axios';
import ioUri from '../../../config';

const courseUri = ioUri.course;

const PAGELOADSTATE = Symbol.for('PAGELOADSTATE');

const $$initState = {
  loading: true,
};

export function loadCoursePage(data) {
  return {
    type: PAGELOADSTATE,
    playload: data,
  };
}

export default function detailContent(state = $$initState, action) {
  switch (action.type) {
    case Symbol.for('PAGELOADSTATE'):
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
}

function queryCourseList() {
  try {
    const reqconfig = {
      method: 'GET',
      url: `${courseUri.list}?limit=1&offset=10`,
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
        resolve(listData.data);
      } else {
        reject(listData);
      }
    });
  };
}
