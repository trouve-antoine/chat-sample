import { IMessageDB, RecieveAllMessagesCallback } from ".";

export class ArrayMessageDB implements IMessageDB {
  allMessages: string[] = [];

  async appendMessage(messages: string) {
    this.allMessages.push(messages);
  }

  async getAllMessages() {
    return this.allMessages;
  }

  recieveAllMessagesCallbacks: RecieveAllMessagesCallback[] = [];
  onRecieveAllMessages(cb: RecieveAllMessagesCallback) {
    this.recieveAllMessagesCallbacks.push(cb);
  }

  close() { /** nothing to do */ }
}