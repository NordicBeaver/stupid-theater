import fastifyCors from '@fastify/cors';
import fastify from 'fastify';
import { nanoid } from 'nanoid';
import { WebSocketServer } from 'ws';
import { charactersRouter } from './routes/characters';
import { playscriptEventsRouter } from './routes/playscriptEvents';
import { playscriptsRouter } from './routes/playscripts';
import { connectedSocketClients } from './socket/sockets';

const server = fastify({ logger: true });

server.register(fastifyCors);

server.register(playscriptEventsRouter, { prefix: '/playscript/events' });
server.register(playscriptsRouter, { prefix: '/playscripts' });
server.register(charactersRouter, { prefix: '/characters' });

const ws = new WebSocketServer({ server: server.server });

ws.on('connection', (socket) => {
  const id = nanoid();
  connectedSocketClients.push({ id: id, socket: socket });
  console.log(`Socket connected:, ${id}`);

  socket.on('close', () => {
    console.log(`Socket disconnected:, ${id}`);
  });

  socket.on('message', (message) => {
    console.log('Message from socket:', message.toString());
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
