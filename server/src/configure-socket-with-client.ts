import * as socketIo from 'socket.io';
import { IMessageDB } from './message-db';

export default function(ioWithClient: socketIo.Namespace, messageDb: IMessageDB) {
  ioWithClient.on('connection', async socket => {
    socket.emit('all-messages', {
      allMessages: await messageDb.getAllMessages()
    });

    socket.on('message', async function ({ message }) {
      console.log("Got message", message)
      
      messageDb.appendMessage(message)

      ioWithClient.emit('all-messages', {
        allMessages: await messageDb.getAllMessages()
      })
    });
  });
}