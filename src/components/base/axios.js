import axios from 'axios';
import { Toast } from 'antd-mobile';

/**
 * 请求拦截器
 * 请求之前加上加载图和统一的头信息
 */
axios.interceptors.request.use((config) => {
  Toast.loading('Loading...');
  return {
    dataType: 'json',
    headers: {
      contentType: 'application/json',
    },
    ...config,
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
