module.exports = config => services => {
  const allMessages = []

  return {
    appendMessage: message => allMessages.push(message),
    getAllMessages: () => [...allMessages]
  }
}