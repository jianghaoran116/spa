/**
 * @file 请求地址配置文件
 * @author haoran
 */
import baseConfig from '../config';

let ioUri = '';
console.log(process.env.NODE_ENV);
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
  bill: {
    detail: `${ioUri}fids/api/reportAnalysis/queryBillInfo`,
  },
  voucher: {
    detail: `${ioUri}fids/api/reportAnalysis/queryVoucherInfo`,
  },
};

export default config;
