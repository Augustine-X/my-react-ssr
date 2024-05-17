const express = require('express');
const path = require('node:path');
const app = express();
const port = 3008;

//设置视图引擎为ejs
app.set('view engine','ejs');
//设置视图文件位置
//渲染页面时，就会从该目录下寻找res.render()中设置的ejs文件名

const ejsDir = path.resolve(__dirname, "./template");
app.set("views", ejsDir);
const html = '<div>这是一个 div </div>';
app.get('/',function (req,res) {
     //参数一：渲染的ejs文件名
  //参数二：传给ejs文件的参数值
  res.render("index", {  html });
})
app.listen(port, function(){
    console.log(`Server is running at http://localhost:${port}`)
});

