import { FastifyPluginCallback } from 'fastify';
import { playRooms } from '../playRooms';

interface PlayroomDto {
  id: string;
  playscriptId: string;
}

export const playroomsRouter: FastifyPluginCallback = (server, opts, done) => {
  server.get('/:id', async (request, response) => {
    const params = request.params as { id: string };
    const playroomId = params.id;
    const playroom = playRooms.find((playroom) => playroom.id === playroomId);
    if (!playroom) {
      return response.code(404).send();
    }
    const playroomDto: PlayroomDto = { id: playroom.id, playscriptId: playroom.playscriptId };
    return { playroom: playroomDto };
  });

  done();
};
