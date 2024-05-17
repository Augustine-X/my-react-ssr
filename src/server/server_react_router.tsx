import express from 'express';
import React from 'react';
import path from 'node:path';
import { renderToString }  from 'react-dom/server';
import { StaticRouter } from "react-router-dom/server";

import Home from '../client_router/Home';


async function main(){

    const app = express();
    const port = 3088;

    // 图片等静态资源
    app.use(
        express.static(path.join(process.cwd(), './dist'))
    )
    
    app.get('/',function (req,res) {
        let data = ['tom','jerry','jack'];
        let content = renderToString(
            <StaticRouter location={req.url}>
                <Home userList={data} />
            </StaticRouter>
        );

        res.send(
        `
        <script>window.__initialState = { initialData: ${JSON.stringify(data)} };</script>
        <div id="root">${content}</div>
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

