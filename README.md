## 🧩 Build Environment:  
webpack v4.25.1  
babel v7.2.0

#### 启动流程：  
1. 安装  

``` javascript 
  npm install 
``` 
2. 安装完后运行:  
``` javascript 
  npm run dev:dll // 打包第三方库
  npm prod:dll 
```  

3. 开发运行:  
``` javascript 
  npm run dev:server // 启动前端服务
```  

4. 需要看打包后的文件:  
``` javascript 
  npm run dev:build
```  

5. 打包生产环境代码:  
``` javascript 
  npm run prod:build
```  

6. 需要起前端服务（调试配置文件）:  
``` javascript 
  npm run dev:express:server
  或
  npm run prod:express:server
```  

### 修改配置文件 *config.js* **根目录下**, src下为前端的接口配置文件  
``` javascript
  public_path_prod: '' // publicPath
  port: '' // 端口
  template_root_dir_prod: `${__dirname}/dist/` // index.html的目录地址 dist/  
  static_dir_prod:  `${__dirname}/dist/static/` // 静态资源的目录地址 dist/static/
  base_name_prod:  '/spa', // eg: www.xxxxx.com/spa -> /spa 这里是给前端用的  
  io: {
    server_host_prod: 'http://123.207.172.63:8686/', // 接口地址
  }
  page // 设置index.html里的值 比如title 
```

## ⚙️ Code Base:
react v16.6.3  
Redux  v4.0.4  
React-Router  v5.1.2  
stylus v0.54.7 // 底层node  
 
``` javascript 
|-- doc-detail // 混合方式划分文件结构    
    |-- app.jsx // 入口文件  
    |-- utils  
    |-- components // 应用的组件 对应view  
    |   |-- 404  
    |   |   |-- index.jsx  
    |   |   |-- index.styl  
    |   |-- home  
    |       |-- index.jsx  
    |       |-- index.styl  
    |-- containers  
    |   |-- DevTools.js  
    |-- fonts // 字体  
    |-- html-templates // 前端模版  
    |   |-- app.ejs  
    |-- layout // 布局相关的样式  
    |   |-- frame.jsx  
    |   |-- nav.jsx  
    |-- redux  
    |   |-- reducers.js  
    |-- routes  
    |-- styles // 全局样式  
    |   |-- app.styl  
    |   |-- reset.styl  
    |   |-- theme.styl  
    |   |-- images  
    |-- view // 页面的入口文件 一般为路由组件  
        |-- 404  
        |   |-- index-redux.js  
        |   |-- index.jsx  
        |   |-- index.styl  
        |-- home  
            |-- index-redux.js  
            |-- index.jsx  
            |-- index.styl  
```
