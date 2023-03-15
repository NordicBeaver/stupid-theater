import { PrismaClient } from '@prisma/client';
import fastify from 'fastify';

const server = fastify({ logger: true });
const prisma = new PrismaClient();

server.get('/playscripts', async (requiest, response) => {
  const playsripts = await prisma.playscript.findMany();
  return { playsripts: playsripts };
});

const start = async () => {
  try {
    await server.listen({ port: 3001 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
