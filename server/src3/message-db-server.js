const request = require('request')

module.exports = config => services => {
  const { antoineHost, socketName, socketPath } = config
  
  const ioClientWithBackend = require('socket.io-client')(`http://${config.antoineHost}/${socketName}`, { path: socketPath });

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
    })
  }
}