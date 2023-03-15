import fastifyCors from '@fastify/cors';
import fastify from 'fastify';
import { playscriptsRouter } from './routes/playscripts';

const server = fastify({ logger: true });

server.register(fastifyCors);

server.register(playscriptsRouter, { prefix: '/playscripts' });

const start = async () => {
  try {
    await server.listen({ port: 3001 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
