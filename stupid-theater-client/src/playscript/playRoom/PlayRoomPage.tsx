import { useParams } from '@solidjs/router';
import { Component, onCleanup } from 'solid-js';
import { Page } from '../../ui/Page';

export const PlayRoomPage: Component = () => {
  const params = useParams<{ id: string }>();

  const socket = new WebSocket(import.meta.env.VITE_SOCKET_URL);

  const socketConnectMessage = { message: 'JoinRoom', payload: { roomId: params.id } };

  socket.addEventListener('open', () => {
    socket.send(JSON.stringify(socketConnectMessage));
  });

  onCleanup(() => {
    socket.close();
  });

  return <Page>Play Room ${params.id}</Page>;
};
