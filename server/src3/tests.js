const assert = require('assert')

const config = {
  socketName: "chat", socketPath: "/chat-test",
  antoineHost: 'localhost:4546' // TODO: adapt the IP
}

const log = {
  info: () => {},
  warn: console.warn,
  error: console.error
}

describe("Test the array message DB", () => {
  const services = { log }
  const messageDb = require('./message-db-array')(config)(services)
  messageDbTests(messageDb)
})

describe("Test the server message DB", () => {
  const services = { log }
  const messageDb = require('./message-db-server')(config)(services)
  messageDbTests(messageDb)
})

function messageDbTests(messageDb) {
  it("There are no message at the begining", () =>
    messageDb.getAllMessages()
    .then(allMessages => {
      assert.equal(allMessages.length, 0)
    })
  )

  it("Add a message", async () =>
    messageDb.appendMessage("こんにちは")
    .then(() =>
      messageDb.getAllMessages()
    )
    .then(allMessages => {
      assert.equal(allMessages.length, 1)
      assert.equal(allMessages[0], "こんにちは")
    })
  )

  it("Add another message", () => {
    /* TODO */
    /* 1. append the message */
    /* 2. check there are now 2 messages */
    /* 3. check the 2nd message is as expected */
  })

  it("Close the DB", () =>
    messageDb.close()
  )
}