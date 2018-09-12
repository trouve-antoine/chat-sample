import * as express from 'express';
import * as http from 'http';
import * as socket from 'socket.io';
import configureSocketWithClient from './configure-socket-with-client';
import { IServerInfos } from './server-infos';
import { ServerMessageDB } from './message-db/server-message-db';
import { MessageServerDriver } from './message-server/http-server';

const thisServerInfos: IServerInfos = {
  port: 4545,
  hostName: "localhost",
  socketPath: "/chat-test",
  socketName: "chat"
};

const antoineMessageServerInfos: IServerInfos = {
  hostName: "54.95.166.188:8080",
  socketPath: "/chat-test",
  socketName: "chat"
};

const app = express();
const httpServer = new http.Server(app);
const io = socket({ path: thisServerInfos.socketPath }).listen(httpServer).of(thisServerInfos.socketName);

const messageServerDriver = new MessageServerDriver(antoineMessageServerInfos);
const messageDb = new ServerMessageDB(messageServerDriver);

configureSocketWithClient(io, messageDb);

httpServer.listen(thisServerInfos.port, thisServerInfos.hostName, (err: Error) => {
  if (err) { console.error("Got error while listeing http", err) }
  console.log('listening to the http api and socket actions at ' + thisServerInfos.hostName + ':' + thisServerInfos.port)
});