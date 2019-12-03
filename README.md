## 🧩 Build Environment:  
webpack v4.25.1  
babel v7.2.0

## 🛴 Usage: 
dev:build // 打包出测试环境文件  
dev:analysis // 生成测试环境下的分析文件  
dev:server:analyzer // webpack的分析  
dev:server // 用webpack启动服务  
build // 打包生产环境下的文件  
build:dll:dev // 打包测试环境的dll文件  
build:dll:prod // 打包生产环境的dll文件  

## ⚙️ Code Base:
react v16.6.3  
Redux  v4.0.4  
React-Router  v5.1.2  
stylus v0.54.7 // 底层node  
 
``` javascript 
|-- m-report // 混合方式划分文件结构    
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
