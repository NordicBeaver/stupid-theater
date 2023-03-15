import { FastifyPluginCallback } from 'fastify';
import { prisma } from '../prisma';

interface UpdateCharacterRequest {
  id: string;
  name?: string;
  descripton?: string;
}

export const charactersRouter: FastifyPluginCallback = (server, opts, done) => {
  server.post('/update', async (request, response) => {
    const requestData = request.body as UpdateCharacterRequest;
    const character = await prisma.character.update({
      where: { id: requestData.id },
      data: { name: requestData.name, description: requestData.descripton },
    });
    return { character: character };
  });

  done();
};
