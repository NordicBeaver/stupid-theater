import { FastifyPluginCallback } from 'fastify';
import { prisma } from '../prisma';

interface CreatePlayscriptDto {
  name: string;
}

interface UpdatePlayscriptDto {
  id: string;
  name?: string;
}

interface DeletePlayscriptDto {
  id: string;
}

export const playscriptsRouter: FastifyPluginCallback = (server, opts, done) => {
  server.get('/', async (requiest, response) => {
    const playsripts = await prisma.playscript.findMany();
    return { playscripts: playsripts };
  });

  server.post('/create', async (request, response) => {
    const dto = request.body as CreatePlayscriptDto;
    const playscript = await prisma.playscript.create({ data: { name: dto.name } });
    return { playscript: playscript };
  });

  server.post('/update', async (request, response) => {
    const dto = request.body as UpdatePlayscriptDto;
    const playscript = await prisma.playscript.update({ where: { id: dto.id }, data: { name: dto.name } });
    return { playscript: playscript };
  });

  server.post('/delete', async (request, response) => {
    const dto = request.body as DeletePlayscriptDto;
    const id = dto.id;
    const playscript = await prisma.playscript.delete({ where: { id: id } });
    return { playscript: playscript };
  });

  done();
};
