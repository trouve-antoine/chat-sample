module.exports = config => services => {
  const { ioWithClient, messageDb } = services

  ioWithClient.on('connection', function (socket) {
    console.log("A client connected !!!")

    socket.emit('all-messages', {
      allMessages: messageDb.getAllMessages()
    });

    socket.on('message', function ({ message }) {
      console.log("Got message", message)
      
      messageDb.appendMessage(message)

      ioWithClient.emit('all-messages', {
        allMessages: messageDb.getAllMessages()
      })
    });
  });

}