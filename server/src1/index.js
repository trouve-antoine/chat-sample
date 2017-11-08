const port = 4545
const hostName = "localhost"
const socketPath = "/chat-test"
const socketName = "chat"

const express = require('express')

const app = express()

const http = require('http').Server(app)

const io = require('socket.io')({ path: socketPath }).listen(http).of(socketName)

http.listen(port, hostName, err => {
  if (err) { console.error("Got error while listeing http", err) }
  console.log('listening to the http api and socket actions at ' + hostName + ':' + port)
});

const allMessages = []

io.on('connection', function(socket){
  console.log("A client connected !!!")

  socket.emit('all-messages', { allMessages });

  socket.on('message', function({ message }){
    console.log("Got message", message)
    allMessages.push(message)
    io.emit('all-messages', { allMessages })
  });
});
