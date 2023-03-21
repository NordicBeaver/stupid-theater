import fastifyCors from '@fastify/cors';
import fastify from 'fastify';
import { nanoid } from 'nanoid';
import { WebSocketServer } from 'ws';
import { playRooms } from './playRooms';
import { charactersRouter } from './routes/characters';
import { playroomsRouter } from './routes/playrooms';
import { playscriptEventsRouter } from './routes/playscriptEvents';
import { playscriptsRouter } from './routes/playscripts';
import { Message } from './socket/messages';
import { connectedSocketClients } from './socket/sockets';

const server = fastify({ logger: true });

server.register(fastifyCors);

server.register(playscriptEventsRouter, { prefix: '/playscript/events' });
server.register(playscriptsRouter, { prefix: '/playscripts' });
server.register(charactersRouter, { prefix: '/characters' });
server.register(playroomsRouter, { prefix: '/playrooms' });

const ws = new WebSocketServer({ server: server.server });

ws.on('connection', (socket) => {
  const clientId = nanoid();
  connectedSocketClients.push({ id: clientId, socket: socket });
  console.log(`Socket connected:, ${clientId}`);

  socket.on('close', () => {
    console.log(`Socket disconnected:, ${clientId}`);
  });

  socket.on('message', async (messageRaw) => {
    const message = JSON.parse(messageRaw.toString()) as Message;

    if (message.type === 'JoinRoom') {
      const room = playRooms.find((r) => r.id === message.roomId);
      if (!room) {
        return;
      }
      room.players.push({ id: nanoid(), socketId: clientId, isNarrator: false });
    }
  });
});

const start = async () => {
  try {
    await server.listen({ port: 3001, host: '0.0.0.0' });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
