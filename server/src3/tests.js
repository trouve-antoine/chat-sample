const assert = require('assert')

describe("Test the message DB", () => {
  const services = {}
  const messageDb = require('./message-db-array')()(services)

  it("There are no message at the begining", () => {
    assert.equal( messageDb.getAllMessages().length, 0 )
  })

  it("Add a message", () => {
    messageDb.appendMessage("こんにちは")
    assert.equal(messageDb.getAllMessages().length, 1)
    assert.equal(messageDb.getAllMessages()[0], "こんにちは")
  })

  it("Add another message", () => {
    /* TODO */
    /* 1. append the message */
    /* 2. check there are now 2 messages */
    /* 3. check the 2nd message is as expected */
  })
})