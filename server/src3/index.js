const port = 4545
const hostName = "localhost"
const socketPath = "/chat-test"
const socketName = "chat"

const express = require('express')

const http = require('http').Server( express() )

const config = {
  socketName, socketPath,
  antoineHost: 'localhost:4546' // TODO: adapt the IP
}

const services = {}

services.ioServerWithClient = require('socket.io')({ path: socketPath }).listen(http).of(socketName)

// services.messageDb = require('./message-db-array')(config)(services)
services.messageDb = require('./message-db-server')(config)(services)

require('./socket-with-client')(config)(services)

http.listen(port, hostName, err => {
  if (err) { console.error("Got error while listeing http", err) }
  console.log('listening to the http api and socket actions at ' + hostName + ':' + port)
});