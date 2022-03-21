//server.js

let express = require('express');
let app = new express();
const fs = require('fs');
// TLS server configuration.
const tls =
{
	cert: fs.readFileSync(''),
	key: fs.readFileSync(''),
};
//将 socket.io 绑定到服务器上，于是任何连接到该服务器的客户端都具备了实时通信功能。
const httpsServer = https.createServer(tls, app);

httpsServer.listen(8000, '0.0.0.0', () => {
    console.log('Server running on port: ', config.server.listeningPort);
});
const io = require('socket.io')(httpsServer, {
	pingInterval: 20000, //心跳间隔
	pingTimeout: 10000, //心跳超时
});

app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});
let clienSocket_;
//服务器监听所有客户端，并返回该新连接对象
io.on('connection', function (socket) {
    console.log('===>connection request query= ' + JSON.stringify(socket.handshake.query) );
    clienSocket_ = socket;
    socket.on('online', (request, cb) => {
        console.log("====>online" + JSON.stringify(request));
        // ack.with( {"code":true});
        cb({"code":true});

    });
    socket.on('update', function (data) {
        console.log('====>update' + JSON.stringify(data));

    });
    socket.emit('currentAmount', {"count":10.0},(request) => {
        console.log('====>currentAmount' + JSON.stringify(request));
    });
});