module.exports = config => services => {
  const { socketName } = config
  const { ioServerNamespaceWithClient, messageDb, log } = services

  ioServerNamespaceWithClient.on('connection', async socket => {
    console.log(`Got connection from client ${socket.id}`)

    socket.emit('all-messages', {
      allMessages: await getAllMessagesOrEmptyArray()
    })

    messageDb.onRecieveAllMessages( broadcastAllMessagesToClients )

    socket.on('message', async ({ message }) => {
      log.log("Got message", message)

      await messageDb.appendMessage(message)
      .catch(err => { log.error(err) })
    
      broadcastAllMessagesToClients( await getAllMessagesOrEmptyArray() )
    });
  });

  const broadcastAllMessagesToClients = async (allMessages) => {
    ioServerNamespaceWithClient.emit("all-messages", { allMessages })
    
    ioServerNamespaceWithClient.emit('all-messages', {
      allMessages: await getAllMessagesOrEmptyArray()
    })
  }

  const getAllMessagesOrEmptyArray = () =>
    messageDb.getAllMessages()
    .catch(err => { log.error(err); return [] })
}