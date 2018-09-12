import { IMessageDB, RecieveAllMessagesCallback } from ".";
import { IMessageServerDriver } from "../message-server";

interface IAllMessagesResponse {
  allMessages: string[]
}

export class ServerMessageDB implements IMessageDB {
  readonly messageServerDriver: IMessageServerDriver;

  constructor(messageServerDriver: IMessageServerDriver) {
    this.messageServerDriver = messageServerDriver;
    
    this.messageServerDriver.onSocketMessage("all-messages", (res: { allMessages: string[] }) => {
      console.info(`Got all messages from Antoine's computer (#=${res.allMessages.length})`);
      for(const cb of this.recieveAllMessagesCallbacks) cb(res.allMessages);
    })
  }

  async appendMessage(message: string) {
    await this.messageServerDriver.postJson('message', { message })
  }

  async getAllMessages() {
    const resJson = await this.messageServerDriver.getJson<IAllMessagesResponse>('all-messages')
    return resJson.allMessages
  }

  recieveAllMessagesCallbacks: RecieveAllMessagesCallback[] = [];
  onRecieveAllMessages(cb: RecieveAllMessagesCallback) {
    this.recieveAllMessagesCallbacks.push(cb);
  }
  
  async close() {
    await this.messageServerDriver.close()
  }
}