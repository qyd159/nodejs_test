const express = require('express');
const jSmart = require('jsmart');
const bodyParser = require('body-parser');
const path = require('path');
const fs =require('fs');
const app = express();

/*jsmart配置*/
jSmart.prototype.auto_literal = false;
jSmart.prototype.left_delimiter = '{{';
jSmart.prototype.right_delimiter = '}}';
jSmart.prototype.nocache = true;
jSmart.prototype.debugging = true;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//准备静态资源库
app.use(express.static('static'));
app.use('/static', express.static('uploads'));

app.get('/upload', function (req, res) {
    res.sendFile(path.resolve('templates/upload.htm'));
});

//第一题，解析smarty模板并生成一个新闻列表
app.get('/smarty', function (req, res) {
    // your code
    res.end(new jSmart(fs.readFileSync('templates/smarty.htm'), {
        encoding: 'utf-8'
    }).fetch(require('./data/index')));
});

//第二题，上传文件并解析上传excel文件，将数据解析为json文件
app.get('/generate', function (req, res) {
    // your code
});

debugger;

//监听3000端口，启动服务器
app.listen(3000, function (err) {
    if (err) {
        console.error(err);
    }
    console.log('服务已启动');
});