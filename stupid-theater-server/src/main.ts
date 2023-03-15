import fastify from 'fastify';

const server = fastify({ logger: true });

server.get('/', async (requiest, response) => {
  return { hello: 'H!' };
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
