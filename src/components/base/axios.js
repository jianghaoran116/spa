import axios from 'axios';
import { Toast } from 'antd-mobile';

import baseConfig from '../../../config';

/**
 * 请求拦截器
 * 请求之前加上加载图和统一的头信息
 */
axios.interceptors.request.use((config) => {
  Toast.loading('Loading...');
  return {
    dataType: 'json',
    ...config,
    headers: {
      'content-type': 'application/json',
      'x-auth-token': baseConfig.io['x-auth-token'],
    },
  };
}, err => Promise.reject(err));

/**
 * 响应拦截器
 * 响应后去掉加载图
 */
axios.interceptors.response.use((response) => {
  Toast.hide();
  return response;
}, (err) => {
  Toast.hide();
  return Promise.reject(err);
});

export default axios;
