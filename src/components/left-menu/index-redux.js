import Immutable from 'immutable';

const SET_ACTIVEKEY = Symbol.for('SET_ACTIVEKEY');
const SET_NEEDUPDATE = Symbol.for('SET_NEEDUPDATE');
const SET_COMPONENT = Symbol.for('SET_COMPONENT');

const id = 1;
const $$initState = Immutable.fromJS({
  id,
  activeKey: '',
  needUpdate: false,
  dyComponent: null,
  treeData: [
    {
      code: 'courselist',
      name: '课程列表',
      isEnd: true,
    },
    {
      code: 'courseinfo',
      name: '课程信息',
      isEnd: true,
    },
  ],
});

export default function leftMenuTree(state = $$initState, action) {
  switch (action.type) {
    case Symbol.for('SET_ACTIVEKEY'):
      return state.merge(
        {
          activeKey: action.payload,
        },
      );
    case Symbol.for('SET_NEEDUPDATE'):
      return state.merge(
        {
          needUpdate: action.payload,
        },
      );
    case Symbol.for('SET_COMPONENT'):
      return state.merge(
        {
          dyComponent: action.payload,
        },
      );
    default:
      return state;
  }
}

const recursiveFind = (list, code, data) => {
  if (!list.length) return;
  list.forEach((item) => {
    if (item.children) {
      recursiveFind(item.children, code, data);
    } else {
      if (item.code !== code) return;
      data.push(item);
    }
  });
};

export function execHandler(menuCode) {
  return (dispatch, getState) => {
    const { treeData } = getState().leftMenuTree.toJS();
    if (!treeData) return;
    // menuCode = JSON.parse(menuCode);
    const returnData = [];
    if (typeof menuCode === 'object') {
      returnData.push(JSON.parse(menuCode));
      // menuCode = menuCode.code;
    } else {
      recursiveFind(treeData, menuCode, returnData);
      // if (returnData.length !== 1) return;
    }
  };
}

function setActiveKeySuccess(key) {
  return {
    type: SET_ACTIVEKEY,
    payload: key,
  };
}

function setNeedUpdate(status) {
  return {
    type: SET_NEEDUPDATE,
    payload: status,
  };
}

function setComponent(component) {
  return {
    type: SET_COMPONENT,
    payload: component,
  };
}

export function setActiveKey(key) {
  return (dispath, getState) => {
    if (getState().leftMenuTree.toJS().needUpdate === key) {
      dispath(setNeedUpdate(false));
    } else {
      dispath(setNeedUpdate(true));
    }
    dispath(setActiveKeySuccess(key));
  };
}

export function setImportComponent(key, preComponent) {
  return (dispatch) => {
    const component = null;

    switch (key) {
      case 'courselist':
        dispatch(setComponent(preComponent));
        import(/* webpackChunkName: "course" */ '../../view/course')
          .then((rcomponent) => {
            console.log(rcomponent);
            dispatch(setComponent(rcomponent.default));
          });
        break;

      default:
        dispatch(setComponent(component));
        break;
    }
  };
}
