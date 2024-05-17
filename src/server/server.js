const express = require('express')
const app = express();
const port = 3008;



app.get('/',function (req,res) {
    res.send(
    `<html>
    <head>
    <title>express ssr</title>
    </head>
    <body>
    <h1>Hello SSR</h1>
    </body>
    </html>`
    )
})
app.listen(port, function(){
    console.log(`Server is running at http://localhost:${port}`)
});