import { IMessageDB, RecieveAllMessagesCallback } from ".";
import fetch from 'node-fetch';
import * as socketClient from 'socket.io-client';

import { IServerInfos } from '../server-infos';

interface IAllMessagesResponse {
  allMessages: string[]
}

export class ServerMessageDb implements IMessageDB {
  readonly messageServerInfos: IServerInfos;
  readonly ioClientWithBackend: SocketIOClient.Socket;

  constructor(antoineHostInfos: IServerInfos) {
    this.messageServerInfos = antoineHostInfos;
    this.ioClientWithBackend = socketClient(`http://${this.messageServerInfos.hostName}/${this.messageServerInfos.socketName}`, {
      path: this.messageServerInfos.socketPath
    });
    this.ioClientWithBackend.on("all-messages", (res: { allMessages: string[] }) => {
      console.info(`Got all messages from Antoine's computer (#=${res.allMessages.length})`);
      for(const cb of this.recieveAllMessagesCallbacks) cb(res.allMessages);
    })
  }

  async appendMessage(message: string) {
    await fetch(`http://${this.messageServerInfos.hostName}/message`, {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  async getAllMessages() {
    const res = await fetch(`http://${this.messageServerInfos.hostName}/all-messages`, {
      headers: {
        'Accept': 'application/json'
      }
    })

    const resJson: IAllMessagesResponse = await res.json();

    return resJson.allMessages
  }

  recieveAllMessagesCallbacks: RecieveAllMessagesCallback[] = [];
  onRecieveAllMessages(cb: RecieveAllMessagesCallback) {
    this.recieveAllMessagesCallbacks.push(cb);
  }
  
  async close() {
    this.ioClientWithBackend.close()
  }
}