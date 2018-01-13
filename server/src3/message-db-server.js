const request = require('request')
const config = require('./config')

const { antoineHost, socketName, socketPath } = require('./config')

const log = console

const ioClientWithBackend = require('socket.io-client')(`http://${config.antoineHost}/${socketName}`, { path: socketPath });

recieveAllMessagesHandlers = []

ioClientWithBackend.on("all-messages", ({ allMessages }) => {
  log.info(`Got all messages from Antoine's computer (#=${allMessages.length})`)
  recieveAllMessagesHandlers.forEach( cb => cb(allMessages) )
})

module.exports = {
  appendMessage: message => new Promise((resolve, reject) => {
    request({
      method: 'POST',
      url: `http://${antoineHost}/message`,
      json: true,
      body: { message }
    }, (error, response, body) => {
      if(error) { return reject(error) }
      resolve()
    });
  }),
  getAllMessages: () => new Promise((resolve, reject) => {
    request({
      method: 'GET',
      url: `http://${antoineHost}/all-messages`,
      json: true
    }, (error, response, body) => {
      if (error) { return reject(error) }
      resolve( body.allMessages )
    });
  }),
  onRecieveAllMessages: cb => {
    recieveAllMessagesHandlers.push(cb)
  },
  close: () => {
    ioClientWithBackend.close()
  }
}