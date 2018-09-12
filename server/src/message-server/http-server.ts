import { IServerInfos } from "../server-infos";
import { IMessageServerDriver, OnSocketMessageCallback } from ".";

import fetch from 'node-fetch';
import * as socketClient from 'socket.io-client';

const JSON_MIME_TYPE = 'application/json';

export class MessageServerDriver implements IMessageServerDriver {
  readonly messageServerInfos: IServerInfos;
  readonly ioClientWithBackend: SocketIOClient.Socket;

  constructor(antoineHostInfos: IServerInfos) {
    this.messageServerInfos = antoineHostInfos;

    this.ioClientWithBackend = socketClient(`http://${this.messageServerInfos.hostName}/${this.messageServerInfos.socketName}`, {
      path: this.messageServerInfos.socketPath
    });
  }

  onSocketMessage<ResponseT>(messageName: string, cb: OnSocketMessageCallback<ResponseT>){
    this.ioClientWithBackend.on(messageName, cb);
  };

  async postJson<RequestT>(path: string, body: RequestT) {
    await fetch(`http://${this.messageServerInfos.hostName}/${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Accept': JSON_MIME_TYPE,
        'Content-Type': JSON_MIME_TYPE
      }
    })
  }

  async getJson<ResponseT>(path: string) {
    const res = await fetch(`http://${this.messageServerInfos.hostName}/${path}`, {
      headers: { 'Accept': JSON_MIME_TYPE }
    })

    return await res.json() as ResponseT;
  }

  async close() {
    this.ioClientWithBackend.close();
  }
}