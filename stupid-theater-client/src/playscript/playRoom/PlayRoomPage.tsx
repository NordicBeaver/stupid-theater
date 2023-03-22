import { useParams } from '@solidjs/router';
import { sortBy } from 'lodash';
import { Component, createEffect, createResource, createSignal, For, onCleanup, Show } from 'solid-js';
import { findPlayscript, getEvents, getPlayroom } from '../../api';
import { Button } from '../../ui/Button';
import { Page } from '../../ui/Page';
import { PlayscriptEvent } from '../Playscript';
import { CharacterSelect } from './CharacterSelect';
import { AdvanceLineIndexMessage, JoinRoomMessage, Message } from './messages';
import { PlayscriptEventCard } from './PlayscriptEventCard';

export const PlayRoomPage: Component = () => {
  const params = useParams<{ id: string }>();

  const [playroom] = createResource(() => getPlayroom(params.id));
  const [playscript] = createResource(playroom, (currentPlayroom) => findPlayscript(currentPlayroom.playscriptId));
  const [playscriptEvents] = createResource(playroom, (currentPlayroom) => getEvents(currentPlayroom.playscriptId));

  const [characterId, setCharacterId] = createSignal<string | 'narrator' | null>(null);
  const [scriptLineIndex, setScriptLineIndex] = createSignal(0);

  const [currentEvent, setCurrentEvent] = createSignal<PlayscriptEvent | null>(null);
  createEffect(() => {
    const currentEvents = playscriptEvents();
    const currentIndex = scriptLineIndex();
    if (currentEvents != null && currentIndex != null) {
      const currentEvent = currentEvents.find((e) => e.index === currentIndex);
      if (currentEvent) {
        return setCurrentEvent(currentEvent);
      }
    }
    return setCurrentEvent(null);
  });

  const socket = new WebSocket(import.meta.env.VITE_SOCKET_URL);

  socket.addEventListener('open', () => {
    const message: JoinRoomMessage = { type: 'JoinRoom', roomId: params.id };
    socket.send(JSON.stringify(message));
  });

  socket.addEventListener('message', (messageRaw) => {
    const message = JSON.parse(messageRaw.data) as Message;

    if (message.type === 'SetLineIndexMessage') {
      setScriptLineIndex(message.lineIndex);
    }
  });

  onCleanup(() => {
    socket.close();
  });

  const handleNextLine = () => {
    const message: AdvanceLineIndexMessage = { type: 'AdvanceLineIndex' };
    socket.send(JSON.stringify(message));
  };

  return (
    <Page>
      <div class="h-full flex flex-col pt-8">
        <div class="flex justify-center">
          <h1 class="text-2xl">{playscript()?.name}</h1>
        </div>
        <div class="flex-grow flex items-center justify-center">
          {characterId() != null ? (
            playscript() != null && currentEvent() != null ? (
              <PlayscriptEventCard
                event={currentEvent()!}
                characters={playscript()!.characters}
                characterId={characterId()!}
                onNextLine={handleNextLine}
              ></PlayscriptEventCard>
            ) : (
              <div>Loading...</div>
            )
          ) : playscript() != null ? (
            <CharacterSelect playscript={playscript()!} onSelect={setCharacterId}></CharacterSelect>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </Page>
  );
};
