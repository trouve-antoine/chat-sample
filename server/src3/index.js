const express = require('express')
const config = require('./config')

const http = require('http').Server( express() )

const ioServerWithClient = require('socket.io')({ path: config.socketPath }).listen(http)

require('./socket-with-client')(ioServerWithClient)

http.listen(config.port, config.hostName, err => {
  if (err) { console.error("Got error while listeing http", err) }
  console.log('listening to the http api and socket actions at ' + config.hostName + ':' + config.port)
});