# 构建速度

## webpack-dev-servser下  
项目初始化时间: 8022ms  
### 加一下cache-loader 
没加之前修改一次（加一行字符）花费时间: 400ms+-
加之后 也是 400ms+-
**所以提前优化都是魔鬼** 

## 直接build
项目初始化时间: 5000ms+-  
### 加一下cache-loader 
没加之前修改一次（加一行字符）花费时间: 400ms+-
加之后 也是 400ms+-
**同样提前优化都是魔鬼** 

先了解下，需要的时候进行优化  
- 将 loaders 应用于最少数的必要模块中  
``` javascript  
  {
    test: /\.js$/,
    include: path.resolve(__dirname, "src"),
    loader: "babel-loader"
  }
```
- 尽量减少 resolve.modules, resolve.extensions, resolve.mainFiles, resolve.descriptionFiles 中类目的数量，因为他们会增加文件系统调用的次数.  
- Dlls  
- 持久化缓存 cache-loader  
- sourcemap  
- 避免在生产环境下才会用到的工具 简单点就是 开发坏境不压缩  
- 多进程编译  

### 工具相关  
- babel  
- TypeScript 使用单独线程构建  
- sass 如果使用sass node-sass 中有个来自 Node.js 线程池的阻塞线程的 bug。 当使用 thread-loader 时，需要设置 workerParallelJobs: 2

> https://www.webpackjs.com/guides/build-performance/  

现阶段处理了:  
loader里排除了不需要的文件  
dlls  
sourcemap  
开发环境不压缩  