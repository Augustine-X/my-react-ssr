import express from 'express';
import React from 'react';
import path from 'node:path';
import { renderToString }  from 'react-dom/server';

import App from '../client/App';


async function main(){

    const app = express();
    const port = 3008;
    
    // 图片等静态资源
    app.use(
        express.static(path.join(process.cwd(), './dist'))
    )

    /*
    【服务端】给过去的首屏是完整的，是有数据的，可以直接展示给用户的。
    【客户端】hydrate 渲染出来的首屏要完全一样，否则会报错。
    因此可以说，首屏的相关 JS 代码逻辑中，不能有「随机数」这种不可控的因素。
    【客户端】首屏的数据 也就要与 服务端注入的完全一样。那如何匹配呢？

    问：能采用以下这种方式么：
        【服务端】中 renderToString 执行了JS 代码，返回了首屏。
        【客户端】首屏中，组件挂载之后再请求数据，拿到数据后，更新一次。保证更新之后和【服务器】返回的首屏一摸一样。
    答：这完全没有意义的，多此一举
    
    
    答：2024-05 至今最推荐的做法是。
        把数据放到 window 上，通过script 标签直接传过去，这样前端不用请求就直接拿到了
    */
    app.get('/',function (req,res) {
        let data = ['tom','jerry','jack'];

        /*
            node 或者说 JS 无法直接执行 <App data={data} /> 这种代码，
            所以 server 端的代码需要打包，其实就是为了 babel 编译
        */
        const content = renderToString( <App initialData={data} /> );
        res.send(
        `
        <div id="root">${content}</div>
        <script>window.__initialState = { initialData: ${JSON.stringify(data)} };</script>
        <script defer src="./bundle.js"></script>
        `
        )
    })
    
    app.use(express.static('static'));
    app.listen(port, function(){
        console.log(`Server is running at http://localhost:${port}`);
    });
    
}

main()
.catch(function(err){
    console.error(err)
})



/*
SSR 分为三个阶段，
第一个阶段，通过 renderToString/renderToStream 输出 html，通过 hydrate 完成前端增量渲染；
第二阶段，解决后端数据请求，直接渲染带数据的 HTML，并实现数据注入，通过 http 分片输出，解决首屏快速渲染等；
第三阶段，解决服务端渲染性能消耗问题，
    上 k8s 或 serverless 解决渲染问题，
    上 CDN、缓存、均衡负载、监控等，确保降级服务。
    
另外，SSR 实际上不是适合每一种场景。最主要的场景是：
    1. SEO；
    2. 快速渲染首屏以解决白屏（提升用户体验）；
    3. 单页内容展示。那种带有复杂用户操作的，DOM 结构特别复杂的，都不大适合 SSR。

*/

