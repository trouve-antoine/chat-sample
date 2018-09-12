import * as assert from 'assert';

import { IMessageServerDriver, OnSocketMessageCallback } from '../src/message-server';
import { ServerMessageDB } from '../src/message-db/server-message-db';

class MessageServerStubDriver implements IMessageServerDriver {
  readonly messages = [ "message1", "message2" ];
  async postJson<RequestT>(path: string, body: RequestT) {
    assert(path == "message");
    const message = (body as any).message;
    assert((typeof message) === "string" );
    this.messages.push(message);
  }
  async getJson<ResponseT>(path: string) {
    assert(path == "all-messages");
    return { allMessages: this.messages } as any as ResponseT;
  }
  async onSocketMessage<ResponseT>(messageName: string, cb: OnSocketMessageCallback<ResponseT>) {
    // save the callback
  }
  async close() { /* no connection to close */ }
}

const messageServerDriver = new MessageServerStubDriver();
const messageDb = new ServerMessageDB(messageServerDriver);

describe("Test the glue logic to the server message DB", () => {
  it("Get all the messages", async () => {
    const allMessages = await messageDb.getAllMessages();
    assert(allMessages.length === 2);
  })

  it("Send a message", async () => {
    await messageDb.appendMessage("Hi");
    const allMessages = await messageDb.getAllMessages();
    assert(allMessages.length === 3);
    assert(allMessages[2] === "Hi");
  })

  it("The db is notified when the server sends a socket message", async () => {
    assert.fail();
  })
})