/*
 * @file 配置文件
 * @author haoran
 */

module.exports = {
  // Deploy
  public_path_dev: '/', // public path
  public_path_prod: '//www.curlyhair.cn/',
  port: 8181,
  plugin_url: '',
  ga_id: '',
  fb_id: '',
  analyse_bundle: true,

  // 打包文件路径
  // template - index.html
  // static - 静态资源
  template_root_dir_dev: `${__dirname}/dist/`,
  template_root_dir_prod: `${__dirname}/dist/`,
  static_dir_dev: `${__dirname}/dist/static/`,
  static_dir_prod: `${__dirname}/dist/static/`,

  // react browserRouter basename - FE
  base_name_dev: '/',
  base_name_prod: '/', // www.xxxxx.com/spa -> /spa

  // HTML meta data
  page: {
    title: 'm-report',
    desc: '',
    image: '',
    url: '',
    thumb: '',
  },

  // request url
  io: {
    // server_host_dev: 'http://localhost:9093/',
    // 'x-auth-token': localStorage.getItem('token'),
    server_host_dev: 'https://api.morningtogether.com/admin-service/',
    server_host_prod: 'https://api.morningtogether.com/admin-service/',
    login_adr_dev: 'https://api.morningtogether.com/auth-service/',
    login_adr_prod: 'https://api.morningtogether.com/auth-service/',
  },
};
