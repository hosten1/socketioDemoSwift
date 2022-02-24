//server.js

let express = require('express');
let app = new express();
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);
//将 socket.io 绑定到服务器上，于是任何连接到该服务器的客户端都具备了实时通信功能。

server.listen(8000);

app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

//服务器监听所有客户端，并返回该新连接对象
io.sockets.on('connection', function (socket) {
    socket.emit('currentAmount', {"count":10.0});
    socket.on('canUpdate', function (data) {
        console.log(data +  new Date());

    });
    socket.on('Got your currentAmount', function (data) {
        console.log(data +  new Date());

    });
});