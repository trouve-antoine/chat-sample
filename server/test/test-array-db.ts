import { ArrayMessageDB } from "../src/message-db/array-db";

const assert = require('assert')

describe("Test the message DB", () => {
  const messageDb = new ArrayMessageDB();

  it("There are no message at the begining", async () => {
    const allMessages = await messageDb.getAllMessages();
    assert.equal( allMessages.length, 0)
  })

  it("Add a message", async () => {
    messageDb.appendMessage("こんにちは")
    const allMessages = await messageDb.getAllMessages();
    assert.equal(allMessages.length, 1)
    assert.equal(allMessages[0], "こんにちは")
  })

  it("Add another message", async () => {
    messageDb.appendMessage("ヤッホー")
    const allMessages = await messageDb.getAllMessages();
    assert.equal(allMessages.length, 2)
  })

  it("Messages are the oldest first", async () => {
    const allMessages = await messageDb.getAllMessages();
    assert.equal(allMessages.length, 2)
    assert.equal(allMessages[0], "こんにちは")
    assert.equal(allMessages[1], "ヤッホー")
  })
})