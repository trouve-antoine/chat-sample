import * as express from 'express';
import * as http from 'http';
import * as socket from 'socket.io';
import { ArrayMessageDb } from './message-db/array-db';
import configureSocketWithClient from './configure-socket-with-client';
import { ServerMessageDb } from './message-db/server-message-db';
import { IServerInfos } from './server-infos';

const thisServerInfos: IServerInfos = {
  port: 4545,
  hostName: "localhost",
  socketPath: "/chat-test",
  socketName: "chat"
};

const antoineMessageServerInfos: IServerInfos = {
  hostName: "localhost:8080",
  socketPath: "/chat-test",
  socketName: "chat"
};

const app = express();
const httpServer = new http.Server(app);
const io = socket({ path: thisServerInfos.socketPath }).listen(httpServer).of(thisServerInfos.socketName);

const messageDb = new ArrayMessageDb();

configureSocketWithClient(io, messageDb);

httpServer.listen(thisServerInfos.port, thisServerInfos.hostName, err => {
  if (err) { console.error("Got error while listeing http", err) }
  console.log('listening to the http api and socket actions at ' + thisServerInfos.hostName + ':' + thisServerInfos.port)
});