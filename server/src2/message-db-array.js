module.exports = () => {
  const allMessages = []

  return {
    appendMessage: message => allMessages.push(message),
    getAllMessages: () => [...allMessages],
  }
}