import * as socketIo from 'socket.io';
import { ArrayMessageDB } from './message-db/array-db';

export default function(ioWithClient: socketIo.Namespace) {
  const messageDb = new ArrayMessageDB();

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