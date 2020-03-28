/* eslint-disable prefer-destructuring */
import axios from '../../base/axios';
import ioUri from '../../../config';

// const courseUri = ioUri.course;
const teacherUri = ioUri.teacher;
const uploadUri = ioUri.upload;

const PAGELOADSTATE = Symbol('PAGELOADSTATE');
const SET_ORIGINALCOURSEDETAIL = Symbol('SET_ORIGINALCOURSEDETAIL');
const SET_COURSEDETAIL = Symbol('SET_COURSEDETAIL');
const SET_TEACHERLIST = Symbol('SET_TEACHERLIST');
const SET_SUMMARY = Symbol('SET_SUMMARY');
const SET_DETAIL = Symbol('SET_DETAIL');

const $$initState = {
  loading: true,
  originalCourseDetail: {},
  courseDetail: {},
  uploadUri,
  teacherList: [],
  summary: [],
  detail: [],
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
      return {
        ...state,
        teacherList: action.playload,
      };

    case SET_SUMMARY:
      return {
        ...state,
        summary: action.playload,
      };

    case SET_DETAIL:
      return {
        ...state,
        detail: action.playload,
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

export function setSummary(data) {
  return {
    type: SET_SUMMARY,
    playload: data,
  };
}

export function setDetail(data) {
  return {
    type: SET_DETAIL,
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

export function summaryChagne(item, val, idx) {
  return (dispath, getState) => {
    const data = getState().Course.detail.summary;
    data[idx].content = `<p>${val}</p>`;
    dispath(setSummary(data));
  };
}

export function addSummary(idx, type) {
  return (dispath, getState) => {
    const data = getState().Course.detail.summary;
    if (idx === -1) {
      data.push({ type, content: null });
    } else {
      data.splice(idx + 1, 0, { type, content: null });
    }
    dispath(setSummary(data));
  };
}

export function deleteSummary(idx) {
  return (dispath, getState) => {
    const data = getState().Course.detail.summary;
    data.splice(idx, 1);
    dispath(setSummary(data));
  };
}

export function addDetail(idx, type) {
  return (dispath, getState) => {
    const data = getState().Course.detail.detail;
    if (idx === -1) {
      data.push({ type, content: '' });
    } else {
      data.splice(idx + 1, 0, { type, content: '' });
    }
    dispath(setDetail(data));
  };
}

export function detailChagne(item, keyName, val, idx) {
  return (dispath, getState) => {
    const data = getState().Course.detail.detail;
    const itemContent = data[idx].content.split("<div class='course-explain-content'>");
    let title = '';
    const titleArr = /<span>(.*?)<\/span>/g.exec(itemContent[0]);
    let content = '';
    const contentArr = /<span>(.*?)<\/span>/g.exec(itemContent[1]);
    if (titleArr) {
      title = titleArr[1];
    }
    if (contentArr) {
      content = contentArr[1];
    }
    if (keyName === 'title') {
      title = val;
    }
    if (keyName === 'content') {
      content = val;
    }
    data[idx].content = `<div class='course-explain-title'><span>${title}</span></div><div class='course-explain-content'><span>${content}</span></div>`;
    dispath(setDetail(data));
  };
}

export function deleteDetail(idx) {
  return (dispath, getState) => {
    const data = getState().Course.detail.detail;
    data.splice(idx, 1);
    dispath(setDetail(data));
  };
}
