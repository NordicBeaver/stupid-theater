import { WebSocket } from 'ws';

type SocketClient = {
  id: string;
  socket: WebSocket;
};

export const connectedSocketClients: SocketClient[] = [];
