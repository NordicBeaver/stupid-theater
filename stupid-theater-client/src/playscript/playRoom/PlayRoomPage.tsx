import { useParams } from '@solidjs/router';
import { Component, createResource, createSignal, For, onCleanup } from 'solid-js';
import { findPlayscript, getPlayroom } from '../../api';
import { Page } from '../../ui/Page';
import { JoinRoomMessage, Message } from './messages';

export const PlayRoomPage: Component = () => {
  const params = useParams<{ id: string }>();

  const [playroom] = createResource(() => getPlayroom(params.id));
  const [playscript] = createResource(playroom, (currentPlayroom) => findPlayscript(currentPlayroom.playscriptId));

  const socket = new WebSocket(import.meta.env.VITE_SOCKET_URL);

  socket.addEventListener('open', () => {
    const message: JoinRoomMessage = { type: 'JoinRoom', roomId: params.id };
    socket.send(JSON.stringify(message));
  });

  socket.addEventListener('message', (message) => {
    const data = JSON.parse(message.data) as Message;
  });

  onCleanup(() => {
    socket.close();
  });

  return (
    <Page>
      <div class="h-full flex flex-col items-center justify-center gap-12">
        <h1 class="text-4xl">Select a character</h1>
        {playscript() !== null ? (
          <div>
            <For each={playscript()?.characters}>{(character) => <div>{character.name}</div>}</For>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </Page>
  );
};
