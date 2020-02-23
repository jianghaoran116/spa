
import io from 'socket.io-client';
import axios from '../base/axios';

const socket = io('ws://123.207.172.63:9093');
// 获取聊天列表
const MSG_LIST = 'MSG_LIST';
// 读取信息
const MSG_RECV = 'MSG_RECV';
// 标识已读
const MSG_READ = 'MSG_READ';

const initState = {
  chatmsg: [],
  users: {},
  unread: 0,
};

export default function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      console.log('-------');
      console.log(action.payload);
      return {
        ...state,
        users: action.payload.users,
        chatmsg: action.payload.msgs,
        unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length,
      };
    case MSG_RECV:
      // eslint-disable-next-line no-case-declarations
      let n = 0;
      if (action.payload.to === action.userid) {
        n = 1;
      } else {
        n = 0;
      }
      return {
        ...state,
        chatmsg: [...state.chatmsg, action.payload],
        unread: state.unread + n,
      };
    // case MSG_RECV:
    case MSG_READ:
      // eslint-disable-next-line no-case-declarations
      const { from, num } = action.payload;
      return {
        ...state,
        chatmsg: state.chatmsg.map(v => ({ ...v, read: from === v.from ? true : v.read })),
        unread: state.unread - num,
      };
    default:
      return state;
  }
}

function msgList(msgs, users, userid) {
  return {
    type: MSG_LIST,
    payload: {
      msgs,
      users,
      userid,
    },
  };
}

function msgRecv(msg, userid) {
  return {
    userid,
    type: MSG_RECV,
    payload: msg,
  };
}

function msgRead({ from, userid, num }) {
  return {
    type: MSG_READ,
    payload: {
      from,
      userid,
      num,
    },
  };
}

export function readMsg(from) {
  return (dispatch, getState) => {
    axios.post('/api/user/readmsg', { from })
      .then((res) => {
        // eslint-disable-next-line no-underscore-dangle
        const userid = getState().User.userContent._id;
        if (res.status === 200 && res.data.code === 0) {
          dispatch(msgRead({ userid, from, num: res.data.num }));
        }
      });
  };
}

export function recvMsg() {
  return (dispatch, getState) => {
    socket.on('recvmsg', (data) => {
      console.log('recvmsg', data);
      // eslint-disable-next-line no-underscore-dangle
      const userid = getState().User.userContent._id;
      dispatch(msgRecv(data, userid));
    });
  };
}

export function sendMsg({ from, to, msg }) {
  return () => {
    socket.emit('sendmsg', { from, to, msg });
  };
}

export function getMsgList() {
  return (dispatch, getState) => {
    axios.get('/api/user/getmsglist')
      .then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          // eslint-disable-next-line no-underscore-dangle
          const userid = getState().User.userContent._id;
          dispatch(msgList(res.data.msgs, res.data.users, userid));
        }
      });
  };
}
