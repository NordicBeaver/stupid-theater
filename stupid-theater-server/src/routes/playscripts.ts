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
    const playscripts = await prisma.playscript.findMany();
    return { playscripts: playscripts };
  });

  server.get('/:id', async (request, response) => {
    const params = request.params as { id: string };
    const id = params.id;
    const playscript = await prisma.playscript.findFirst({ where: { id: id }, include: { characters: true } });
    return { playscript: playscript };
  });

  server.post('/create', async (request, response) => {
    const dto = request.body as CreatePlayscriptDto;

    const createdPlayscript = await prisma.playscript.create({ data: { name: dto.name } });
    await prisma.character.createMany({
      data: [
        { playscriptId: createdPlayscript.id, order: 0, name: 'Character 1', description: 'Characted description' },
        { playscriptId: createdPlayscript.id, order: 1, name: 'Character 2', description: 'Characted description' },
        { playscriptId: createdPlayscript.id, order: 2, name: 'Character 3', description: 'Characted description' },
        { playscriptId: createdPlayscript.id, order: 3, name: 'Character 4', description: 'Characted description' },
      ],
    });

    const playscript = await prisma.playscript.findFirst({
      where: { id: createdPlayscript.id },
      include: { characters: true },
    });

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
