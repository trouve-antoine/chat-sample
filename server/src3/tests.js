const assert = require('assert')

describe("Test the array message DB", () => {
  const messageDb = require('./message-db-array')

  it("There are no message at the begining", async () => {
    const messages = await messageDb.getAllMessages()
    assert.equal(messages.length, 0)
  })

  it("Add a message", async () => {
    await messageDb.appendMessage("こんにちは")
    const messages = await messageDb.getAllMessages()
    assert.equal(messages.length, 1)
    assert.equal(messages, "こんにちは")
  })
})