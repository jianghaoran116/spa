/**
 * @file 请求地址配置文件
 * @author haoran
 */
import baseConfig from '../config';

let ioUri = '';

if (process.env.NODE_ENV === 'production') {
  ioUri = baseConfig.io.server_host_prod;
} else {
  ioUri = baseConfig.io.server_host_dev;
}

// eslint-disable-next-line no-undef
if (WEBPACK_DEV_SERVER) {
  ioUri = './';
}

const config = {
  course: {
    list: `${ioUri}api/course/list`,
  },
  teacher: {
    list: `${ioUri}api/teacher/list`,
    update: `${ioUri}api/teacher/update`,
  },
  upload: `${ioUri}api/upload/img`,
};

export default config;
