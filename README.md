# 说说 2024-05 的SSR

现在的 SSR 和以前的 ssr 完全不同，现在的 SSR 是简称。全称应该是 **【SSR-同构】**


### 【SPA】项目 (CSR)
#### 优点：
+ 前后端两者各司其职，前端渲染页面，后端实现接口数据。
+ 页面内用户操作进行跳转时，是不刷新的，也不发起请求，所以速度非常快，体验非常好。因为完全是前端路由实现的跳转。
#### 缺点：
+ 页面的内容全部是JS渲染进HTML中的，所以搜索引擎无法爬取分析网页内容，不利于SEO。
+ 首屏速度慢，哪怕打包优化了，也还是有些慢

- - -

### 旧SSR项目
#### 优点：
+ SEO友好
+ 首屏速度快

#### 缺点：
+ 页面每次跳转，都是一个新页面，要发请求，要刷新。


- - -
**发现 CSR 和 SSR 之间是互补的。你的优点正好是我的缺点，而我的优点又正好是你的缺点**

因此出现了将传统的纯服务端直出的首屏优势与客户端渲染站内跳转优势结合的【同构渲染】
* 在【服务器】内，将首屏数据放入HTML结构。生成一个完整的，可直接展示的 HTML ，并设置静态资源插入js文件，发给浏览器
* 浏览器通过加载js文件，绑定DOM事件
* 客户端渲染此时再接管页面，变成一个 SPA 页面
- - -


# 项目运行

先打包 client 再打包 server，因为client 中配置了 clean。

```
npx webpack --config webpack.config.client.js 
npx webpack --config webpack.config.server.js 
```
打包完成后
```
node ./dist/server.js
```

---
加入了路由的 <br/>
后端： ./server/server_react_router.tsx  
前端： ./client_router

没用路由 <br/>
后端： ./server/server_react.tsx
前端： ./client


**要手动改 webpack 中的 entry 路径**



---
运行 server 也可以用 ts-node，参考 package.json 中的脚本
但出现了一个问题，没仔细研究。
ts-node 执行的文件中 如果是 import 图片、媒体资源，就会报错。

