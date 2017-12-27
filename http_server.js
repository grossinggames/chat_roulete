/* *************** Подключение модулей *************** */
var express = require("express");
var port = 3333;
var fs = require('fs');


/* *************** Создание http/https сервера *************** */
var httpServer = express.createServer(//{
    // key: fs.readFileSync(__dirname + '/certificate/server_localhost.key'),
    // cert: fs.readFileSync(__dirname + '/certificate/server_localhost.crt')
// });
);

httpServer.use(express.static("client"));

httpServer.listen(port, function(err) {
    if (err) {
        console.log("Модуль http_server Ошибка при запуске сервера: " + err);
        return false;
    } else {
        console.log('http server start ', port);
    }
});

var io = require('socket.io')(httpServer);

io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('message', function(msg) {
        console.log('user message: ', msg);
        socket.broadcast.emit('message', msg);
        // io.emit('message', msg);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});