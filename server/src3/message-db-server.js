const request = require('request')

module.exports = config => services => {
  const { antoineHost, socketName, socketPath } = config
  const { ioServerWithClient } = services
  
  const ioClientWithBackend = require('socket.io-client')(`http://${config.antoineHost}/${socketName}`, { path: socketPath });

  ioClientWithBackend.on("all-messages", ({ allMessages }) => {
    console.log("Got all messages from Antoine's computer")
    ioServerWithClient.emit({ allMessages })
  })

  return {
    appendMessage: message => new Promise((resolve, reject) => {
      request({
        method: 'POST',
        url: `http://${antoineHost}/message`,
        json: true,
        body: { message }
      }, (error, response, body) => {
        if(error) { reject(error) }
        resolve()
      });
    }),
    getAllMessages: () => new Promise((resolve, reject) => {
      request({
        method: 'GET',
        url: `http://${antoineHost}/all-messages`,
        json: true
      }, (error, response, body) => {
        if (error) { reject(error) }
        resolve( body.allMessages )
      });
    }),
    close: () => {
      ioClientWithBackend.close()
    }
  }
}