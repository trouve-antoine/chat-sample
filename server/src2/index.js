const port = 4545
const hostName = "localhost"
const socketPath = "/chat-test"
const socketName = "chat"

const express = require('express')

const http = require('http').Server( express() )

const io = require('socket.io')({ path: socketPath }).listen(http).of(socketName)

const messageDb = require('./message-db-array')()

require('./socket-with-client')(io, messageDb)

http.listen(port, hostName, err => {
  if (err) { console.error("Got error while listeing http", err) }
  console.log('listening to the http api and socket actions at ' + hostName + ':' + port)
});