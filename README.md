### 静态资源库
    [根目录]
    ├─data    [数据目录]
    │   │
    │   └index.json
    │
    ├─uploads [文件上传/保存目录]
    │   │
    │   └logo-1536533571416.xls
    │
    ├─static  [静态资源目录]
    │   │
    │   └─images
    │       │
    │       └─a.jpg
    │
    ├─server.js [主程序入口]
    └─package.json
> 简单例子,如何获取a.jpg？
```
app.use(express.static('static’));
```
> 可访问地址：http://\<yourdomain\>/images/a.js

> 上面的例子等价于
```
app.use('/',express.static('static’));
```

> 因此，可以这样设置则访问a.js的地址变更为http://\<yourdomain\>/static/images/a.js,实现更灵活的静态资源地址空间分配
```
app.use('/static',express.static('static’));
```

### 文件上传

```
var multer = require('multer');

//定义存储位置及文件名
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
            cb(null, file.fieldname + '-' + Date.now());
    }
});
//生成中间件
var upload = multer({
    storage: storage
}).array("logo", 20);
//上传图片资源到本地服务器
app.post('/upload', upload, function (req, res) {
    var file = req.files;
    res.send({
        list: {
            IMG_URL: file[0].path
        }
    });//打印file
});

```
### session管理
```
app.use(require('cookie-session')({
    name: 'session',
    keys: ['key1', 'key2'],
    signed: false
}));

//使用例子
app.get('/session', function (req, res) {
    // Update views
    var user={
        name:"frontEnder",
        age:"25",
        address:"37 block"
    };
    req.session.user=user;
    req.session.views = (req.session.views || 0) + 1;

    // Write response
    res.end(req.session.views + ' views');
});

```

### 作业一
> 制作一个文件上传的功能,并解析xlsx的表格内容后输出为一个json文件