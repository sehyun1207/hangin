const fs = require('fs')
const express = require('express')
const socket = require('socket.io')
const app = express()

app.use('/css', express.static('./static/css'))
app.use('/js', express.static('./static/js'))

const http = require('http')
const server = http.createServer(app)
const io = socket(server)
app.get('/',function(request, response) {
    fs.readFile('./static/index.html', function(err,data) {
        if(err) {
            response.send('에러')
        } else {
            response.writeHead(200, {'Content-Type':'text/html'})
            response.write(data)
            response.end()
        }
    })
})
io.sockets.on("connection", function(socket){
    socket.on('newUser', function(name) {
        console.log("유저 접속 됨")
        socket.name=name
    })

    socket.on('send', function(data){
        data.name=socket.name
        console.log(data)
        socket.broadcast.emit('update', data)
    })

    socket.on('disconnect',function(){
        console.log('접속 종료')
    })
})

server.listen(80, function(){
    console.log('서버 실행 중')
})