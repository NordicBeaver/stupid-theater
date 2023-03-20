import { WebSocket } from 'ws';
import * as nanoid from 'nanoid';

interface PlayRoom {
  id: string;
  playscriptId: string;
  players: Player[];
  lineIndex: number;
}

interface Player {
  id: string;
  Socket: WebSocket;
  characterId?: string;
  isNarrator: boolean;
}

export const playRooms: PlayRoom[] = [];

export function createPlayRoom(playscriptId: string) {
  const playRoom: PlayRoom = {
    id: nanoid.nanoid(),
    playscriptId: playscriptId,
    players: [],
    lineIndex: 0,
  };
  playRooms.push(playRoom);
  return playRoom;
}
