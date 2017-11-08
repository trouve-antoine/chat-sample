const port = 8080
const hostName = "0.0.0.0"
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

app.use( require('body-parser').json() )

app.post('/message', (req, res, next) => {
  const { message } = req.body
  allMessages.push(message)
  io.emit('all-messages', { allMessages });
  res.status(200).end()
})

app.get('/all-messages', (req, res, next) => {
  res.status(200).json({ allMessages })
})

io.on('connection', function (socket) {
  console.log("A client connected: " + socket.id)

  socket.emit('all-messages', { allMessages });

  socket.on('message', function ({ message }) {
    console.log("Got message", message)
    allMessages.push(message)
    socket.broadcast.emit('all-messages', { allMessages })
  });
});
