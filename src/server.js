
var path = require('path');  // 得到 path 对象, node 自带的
var fs = require('fs');  // 得到文件系统模块对象, node 自带的, 用于操作文件
var mock = require("mockjs");
var app = require('express')();
var port = process.argv.slice(2)[0] || 8080;

var server = app.listen(port, function () {
  console.info('Mock server is listening at ' + port);
});

var api = {};  // 用来保存 mock 配置的 json 对象
var apiPath = "./data/index";

function getApis () {
  api = require(apiPath);
}

//监听api.json变化. 修改 api.json 后调用,更新 api 对象
fs.watchFile(apiPath, function (curr) {
  console.log('API is updated.', curr.mtime);
  getApis();
});

getApis();


//查看API管理
//静态目录
var express = require('express');
const prefix = '/api';

app.use(prefix, express.static(__dirname));

app.all(prefix + '/~m/all', function (req, res) {
  res.contentType("application/json;charset=UTF-8");
  res.send(JSON.stringify(api));
});

app.all(prefix + '/~m', function (req, res) {
  res.sendFile(__dirname + '/asset/api.html');
});


//支持callback
app.set('jsonp callback name', 'callback');

app.use(function (req, res) {
  var data = undefined;
  var delay = 0;

  for (var group in api) {

    // 遍历 api[group] 数组
    if (api[group].find(function (reqData) {
      // reqData 是数组里的对象
      if (reqData.regex) {  // 当前对象 regex 启用的时候,则需要进行正则匹配
        if (!new RegExp(reqData.url).test(req.originalUrl)) {  // 请求的地址无法与 api 中配置的 url 匹配时,则跳过
          return false;
        }
      } else if (req.originalUrl.indexOf(prefix + reqData.url) !== 0) {  // 当请求地址与 api 中配置的地址不同时,说明当前对象不是请求的地址,则跳过
        return false;
      }
      // 请求地址与 api 中 url 地址匹配成功
      var apiRes = reqData.res;
      data = reqData.mock ? mock.mock(apiRes) : apiRes;  // mock.mock() 的作用是:模拟的数据 JSON 对象可以用 mock 语法书写(mock 语法可以递增,随机等功能),然后生成一个处理后的 JSON 对象.
      delay = reqData.delay || 0;  // 通过 delay 配置模拟请求延迟时间
      return true;
    }) !== undefined) {
      break;
    }
  }
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  // res.jsonp(data) 将 JSON 转换为 JSONP 返回
  data !== undefined ? setTimeout(() => res.jsonp(data), delay) : res.sendStatus(404);
});