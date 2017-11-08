const port = 4545
const hostName = "localhost"
const socketPath = "/chat-test"
const socketName = "chat"

const express = require('express')

const http = require('http').Server( express() )

const config = {
  socketName, socketPath,
  antoineHost: '54.250.151.184:8080' // 'localhost:4546' or '54.250.151.184:8080'
}

const services = {}

services.log = console
services.ioServerWithClient = require('socket.io')({ path: socketPath }).listen(http)
services.ioServerNamespaceWithClient = services.ioServerWithClient.of(socketName)

services.messageDb = require('./message-db-server')(config)(services)

require('./socket-with-client')(config)(services)

http.listen(port, hostName, err => {
  if (err) { services.log.error("Got error while listeing http", err) }
  services.log.log('listening to the http api and socket actions at ' + hostName + ':' + port)
});