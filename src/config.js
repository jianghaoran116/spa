/**
 * @file 请求地址配置文件
 * @author haoran
 */
import baseConfig from '../config';

let ioUri = '';
let loginUri = '';

if (process.env.NODE_ENV === 'production') {
  ioUri = baseConfig.io.server_host_prod;
  loginUri = baseConfig.io.login_adr_prod;
} else {
  ioUri = baseConfig.io.server_host_dev;
  loginUri = baseConfig.io.login_adr_dev;
}

// eslint-disable-next-line no-undef
if (WEBPACK_DEV_SERVER) {
  ioUri = './';
}

const config = {
  user: {
    login: `${loginUri}api/user/token/apply`,
  },
  course: {
    add: `${ioUri}api/course/add`,
    update: `${ioUri}api/course/update`,
    list: `${ioUri}api/course/list`,
    del: `${ioUri}api/course/del`,
  },
  teacher: {
    list: `${ioUri}api/teacher/list`,
    add: `${ioUri}api/teacher/add`,
    update: `${ioUri}api/teacher/update`,
    del: `${ioUri}api/teacher/del`,
  },
  upload: `${ioUri}api/upload/img`,
};

export default config;
