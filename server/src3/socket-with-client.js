module.exports = config => services => {
  const { ioServerWithClient, messageDb } = services

  ioServerWithClient.on('connection', async function (socket) {
    console.log("A client connected !!!")

    socket.emit('all-messages', {
      allMessages: await messageDb.getAllMessages()
    });

    socket.on('message', async function ({ message }) {
      console.log("Got message", message)
      
      await messageDb.appendMessage(message)

      ioServerWithClient.emit('all-messages', {
        allMessages: await messageDb.getAllMessages()
      })
    });
  });

}