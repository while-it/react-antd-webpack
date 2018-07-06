#基于 react、antd、dva 的前端架子

> > > ui 框架 Ant Design,
> > > 状态管理 dva，而木有用它自带的 roadrc（感觉封装化太强不是很喜欢）

项目结构

> src
>
> > components 公共组件
> > constants 常量
> > layouts 全局布局
> > models model
> > pages 页面
> > services 所需要的请求方式方法
> > styles 公共样式
> > utils 公共方法

> .babelrc babel 加载配置
> .eslintrc 代码检查
> .npmrc 配置 node-sassurl
> .postcss.config.js css 前缀配置
> theme.js 定制主题

架子优点

> 开箱即用,webpack 做了代码分割，页面路由按需加载,antd 主题自定义,antd 组件以及 antd 样式懒加载、提取公共库、代码压缩、样式文件提取


