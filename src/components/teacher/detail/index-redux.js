import axios from '../../base/axios';
import ioUri from '../../../config';

const uploadUri = ioUri.upload;

const PAGELOADSTATE = Symbol('PAGELOADSTATE');
const SET_TEACHERDETAIL = Symbol('SET_TEACHERDETAIL');
const UPDATE_ID = Symbol('UPDATE_ID');
const UPDATE_NAME = Symbol('UPDATE_NAME');
const UPDATE_IMAGEURL = Symbol('UPDATE_IMAGEURL');
const SET_TEACHERDESCRIPTION = Symbol('SET_TEACHERDESCRIPTION');

// init state
const $$initState = {
  loading: true,
  originalTeacherDetail: {},
  uploadUri,
  id: '',
  name: '',
  imgUri: '',
  teacherDescription: [],
};

// reducer
export default function detailContent(state = $$initState, action) {
  switch (action.type) {
    case PAGELOADSTATE:
      return {
        ...state,
        loading: action.playload,
      };

    case UPDATE_NAME:
      return {
        ...state,
        name: action.playload,
      };

    case UPDATE_IMAGEURL:
      return {
        ...state,
        imgUri: action.playload,
      };

    case SET_TEACHERDETAIL:
      return {
        ...state,
        originalTeacherDetail: action.playload,
      };

    case UPDATE_ID:
      return {
        ...state,
        id: action.playload,
      };

    case SET_TEACHERDESCRIPTION:
      return {
        ...state,
        teacherDescription: action.playload,
      };

    default:
      return state;
  }
}

/**
 * 设置页面是否加载完
 * @param {boolean} data - 通过这个设置页面是否加载完
 */
export function loadTeacherPage(data) {
  return {
    type: PAGELOADSTATE,
    playload: data,
  };
}

export function setTeacherDetail(data) {
  return {
    type: SET_TEACHERDETAIL,
    playload: data,
  };
}

export function getTeacherDetailTask() {
  return async () => new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
}

export function updateName(data) {
  return {
    type: UPDATE_NAME,
    playload: data,
  };
}

export function updateId(data) {
  return {
    type: UPDATE_NAME,
    playload: data,
  };
}

export function updateImageUrl(data) {
  return {
    type: UPDATE_IMAGEURL,
    playload: data,
  };
}

export function setDescription(data) {
  return {
    type: SET_TEACHERDESCRIPTION,
    playload: data,
  };
}

export function addDescriptionTask() {
  return (dispath, getState) => {
    const data = getState().Teacher.detail.teacherDescription.map(item => item);
    data.push({
      content: '',
      type: 0,
      id: data.length,
    });
    dispath(setDescription(data));
  };
}

export function deleteDescriptionTask(obj, idx) {
  return (dispath, getState) => {
    const data = getState().Teacher.detail.teacherDescription.map(item => item);
    data.splice(idx, 1);
    dispath(setDescription(data));
  };
}

export function descriptionContentChange(value, obj, idx) {
  return (dispath, getState) => {
    const data = getState().Teacher.detail.teacherDescription.map(item => item);
    data[idx].content = value;
    dispath(setDescription(data));
  };
}

function updateTeacherDetailAsync(detail) {
  try {
    const data = {};

    if (detail.name) {
      data.name = detail.name;
    }

    if (detail.imgUri) {
      data.icon = detail.imgUri;
    }

    if (detail.teacherDescription && detail.teacherDescription.length > 0) {
      data.description = [];
      detail.teacherDescription.forEach(item => (
        data.description.push({
          type: item.type,
          content: item.content,
        })
      ));
    }

    data.id = 0;

    const reqconfig = {
      method: 'POST',
      url: `${ioUri.teacher.add}`,
      data,
    };
    return axios(reqconfig);
  } catch (err) {
    return Promise.reject(err);
  }
}

export function updateTeacherDetailTask() {
  return async (dispath, getState) => {
    const { detail } = getState().Teacher;
    const data = await updateTeacherDetailAsync(detail);
    return new Promise((resolve, reject) => {
      if (data.status === 200) {
        resolve(data);
      } else {
        reject(new Error(data.msg ? data.msg : '保存失败'));
      }
    });
  };
}

export function initTeacherData() {
  return (dispatch, getState) => {
    const { originalTeacherDetail } = getState().Teacher.detail;
    console.log(originalTeacherDetail);
  };
}
