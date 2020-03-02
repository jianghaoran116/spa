import axios from '../../base/axios';
import ioUri from '../../../config';

const uploadUri = ioUri.upload;

const PAGELOADSTATE = Symbol('PAGELOADSTATE');
const SET_TEACHERDETAIL = Symbol('SET_TEACHERDETAIL');
const SET_TEACHERDESCRIPTION = Symbol('SET_TEACHERDESCRIPTION');

const $$initState = {
  loading: true,
  originalTeacherDetail: [],
  teacherDescription: [],
  uploadUri,
};

export default function detailContent(state = $$initState, action) {
  switch (action.type) {
    case PAGELOADSTATE:
      return {
        ...state,
        loading: action.playload,
      };

    case SET_TEACHERDETAIL:
      console.log(action);
      return {
        ...state,
        originalTeacherDetail: action.playload,
      };

    case SET_TEACHERDESCRIPTION:
      console.log(action);
      return {
        ...state,
        teacherDescription: action.playload,
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

export function setTeacherDetail(data) {
  return {
    type: SET_TEACHERDETAIL,
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

export function getTeacherDetailTask() {
  return async () => new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
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

function uploadImage(file) {
  try {
    const reqconfig = {
      method: 'POST',
      url: `${uploadUri}`,
      data: {
        img: JSON.stringify(file),
      },
    };
    return axios(reqconfig);
  } catch (err) {
    return Promise.reject(err);
  }
}

export function uploadImageTask(file) {
  return async () => {
    const data = await uploadImage(file);
    console.log(data);
    return new Promise((resolve, reject) => {
      if (data.code === 200) {
        resolve();
      } else {
        reject(new Error('上传失败'));
      }
    });
  };
}
