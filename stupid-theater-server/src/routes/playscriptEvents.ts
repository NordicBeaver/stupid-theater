import { FastifyPluginCallback } from 'fastify';
import { prisma } from '../prisma';

interface CreateNarratorEventDto {
  playscriptId: string;
  index: number;
  line: string;
}

interface UpdateNarratorEventDto {
  id: string;
  line?: string;
}

interface CreateCharacterEventDto {
  playscriptId: string;
  index: number;
  lines: {
    charactedId: string;
    line: string;
  }[];
}

interface UpdateCharacterEventDto {
  id: string;
  lines: {
    charactedId: string;
    line: string;
  }[];
}

export const playscriptEventsRouter: FastifyPluginCallback = (server, opts, done) => {
  server.get('/', async (request, response) => {
    const { playscriptId } = request.query as { playscriptId: string };
    const narratorEvents = await prisma.playscriptNarratorEvent.findMany({ where: { playscriptId: playscriptId } });
    const characterEvents = await prisma.playscriptCharacterEvent.findMany({
      where: { playscriptId: playscriptId },
      include: { lines: true },
    });
    return { narratorEvents, characterEvents };
  });

  server.post('/createNarratorEvent', async (request, response) => {
    const dto = request.body as CreateNarratorEventDto;

    await prisma.playscriptNarratorEvent.updateMany({
      where: { playscriptId: dto.playscriptId, index: { gte: dto.index } },
      data: { index: { increment: 1 } },
    });
    await prisma.playscriptCharacterEvent.updateMany({
      where: { playscriptId: dto.playscriptId, index: { gte: dto.index } },
      data: { index: { increment: 1 } },
    });

    const event = await prisma.playscriptNarratorEvent.create({
      data: { playscriptId: dto.playscriptId, index: dto.index, line: dto.line },
    });

    return { event };
  });

  server.post('/updateNarratorEvent', async (request, response) => {
    const dto = request.body as UpdateNarratorEventDto;

    const event = await prisma.playscriptNarratorEvent.update({
      where: { id: dto.id },
      data: { line: dto.line },
    });

    return { event };
  });

  server.post('/createCharacterEvent', async (request, response) => {
    const dto = request.body as CreateCharacterEventDto;

    await prisma.playscriptNarratorEvent.updateMany({
      where: { playscriptId: dto.playscriptId, index: { gte: dto.index } },
      data: { index: { increment: 1 } },
    });
    await prisma.playscriptCharacterEvent.updateMany({
      where: { playscriptId: dto.playscriptId, index: { gte: dto.index } },
      data: { index: { increment: 1 } },
    });

    const event = await prisma.playscriptCharacterEvent.create({
      data: {
        playscriptId: dto.playscriptId,
        index: dto.index,
        lines: {
          createMany: { data: dto.lines.map((lineDto) => ({ characterId: lineDto.charactedId, line: lineDto.line })) },
        },
      },
      include: { lines: true },
    });

    return { event };
  });

  server.post('/updateCharacterEvent', async (request, response) => {
    const dto = request.body as UpdateCharacterEventDto;

    const event = await prisma.playscriptCharacterEvent.findFirst({ where: { id: dto.id }, include: { lines: true } });
    if (!event) {
      return;
    }

    for (const line of event.lines) {
      const updateLineDto = dto.lines.find((l) => l.charactedId === line.characterId);
      if (!updateLineDto) {
        continue;
      }

      await prisma.playscriptCharacterLine.update({ where: { id: line.id }, data: { line: updateLineDto.line } });
    }

    const updatedEvent = await prisma.playscriptCharacterEvent.findFirst({
      where: { id: dto.id },
      include: { lines: true },
    });

    return { event: updatedEvent };
  });

  done();
};
