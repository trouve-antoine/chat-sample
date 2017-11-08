module.exports = config => services => {
  const allMessages = []

  return {
    appendMessage: message => Promise.resolve( allMessages.push(message) ),
    getAllMessages: () => Promise.resolve( [...allMessages] ),
    onRecieveAllMessages: () => {},
    close: () => Promise.resolve()
  }
}