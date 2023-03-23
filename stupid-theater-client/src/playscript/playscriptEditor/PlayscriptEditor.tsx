import { useParams } from '@solidjs/router';
import { max, orderBy } from 'lodash';
import { Component, createResource, createSignal, For, Index, Show, Signal } from 'solid-js';
import { createStore, reconcile, unwrap } from 'solid-js/store';
import {
  createCharacterEvent,
  createNarratorEvent,
  deleteCharacterEvent,
  deleteNarratorEvent,
  findPlayscript,
  getEvents,
  Playscript,
  PlayscriptCharacter,
  updateCharacter,
  updateCharacterEvent,
  updateNarratorEvent,
  updatePlayscript,
} from '../../api';
import { PlayscriptEvent } from '../Playscript';
import { EventRow } from './EventRow';
import { EventRowButtons } from './EventRowButtons';
import { PlayscriptEditorCharacters } from './PlayscriptEditorCharacters';

export const PlayscriptEditor: Component = () => {
  const params = useParams<{ id: string }>();

  const [playscript, { mutate: mutatePlayscript }] = createResource(() => findPlayscript(params.id));

  // TODO: Figure out how this works
  function createDeepSignal<T>(value: T): Signal<T> {
    const [store, setStore] = createStore({
      value,
    });

    return [
      () => store.value,
      (v: T) => {
        const unwrapped = unwrap(store.value);
        if (typeof v === 'function') {
          v = v(unwrapped);
        }
        setStore('value', reconcile(v));
        return store.value;
      },
    ] as Signal<T>;
  }
  const [events, { mutate: mutateEvents }] = createResource(() => getEvents(params.id), { storage: createDeepSignal });

  const handlePlayscriptNameChange = async (newName: string) => {
    const updatedPlayscript = await updatePlayscript({ id: params.id, name: newName });
    mutatePlayscript(updatedPlayscript);
  };

  const handleCharacterChange = async (newCharacter: PlayscriptCharacter) => {
    const updatedCharacter = await updateCharacter({
      id: newCharacter.id,
      name: newCharacter.name,
      description: newCharacter.description,
    });
    mutatePlayscript((oldPlayscript) => {
      if (!oldPlayscript) {
        return oldPlayscript;
      }
      const newCharacters = oldPlayscript.characters.map((character) =>
        character.id === updatedCharacter.id ? updatedCharacter : character
      );
      const newPlayscript: Playscript = { ...oldPlayscript, characters: newCharacters };
      return newPlayscript;
    });
  };

  const handleNewNarratorLine = async (index: number) => {
    const event = await createNarratorEvent({ playscriptId: params.id, index: index, line: '' });
    mutateEvents((oldEvents) => {
      if (!oldEvents) {
        return;
      }
      const eventsWithNewIndices = oldEvents.map((oldEvent) =>
        oldEvent.index >= event.index ? ({ ...oldEvent, index: oldEvent.index + 1 } as PlayscriptEvent) : oldEvent
      );
      const newEvents = [...eventsWithNewIndices, event];
      console.log('Events updated', newEvents);
      return newEvents;
    });
  };

  const handleNewCharacterLine = async (index: number) => {
    const currentPlayscript = playscript();
    if (!currentPlayscript) {
      return;
    }

    const event = await createCharacterEvent({
      playscriptId: params.id,
      index: index,
      lines: currentPlayscript.characters.map((c) => ({ charactedId: c.id, line: '' })),
    });

    mutateEvents((oldEvents) => {
      if (!oldEvents) {
        return;
      }
      const eventsWithNewIndices = oldEvents.map((oldEvent) =>
        oldEvent.index >= event.index ? ({ ...oldEvent, index: oldEvent.index + 1 } as PlayscriptEvent) : oldEvent
      );
      const newEvents = [...eventsWithNewIndices, event];
      console.log('Events updated', newEvents);
      return newEvents;
    });
  };

  const handleEventChange = async (event: PlayscriptEvent) => {
    if (event.type === 'narrator') {
      const updatedEvent = await updateNarratorEvent({ id: event.id, line: event.line });

      mutateEvents((oldEvents) => {
        if (!oldEvents) {
          return;
        }

        const newEvents = oldEvents.map((oldEvent) => (oldEvent.id === updatedEvent.id ? updatedEvent : oldEvent));
        return newEvents;
      });
    } else if (event.type === 'character') {
      const updatedEvent = await updateCharacterEvent({
        id: event.id,
        lines: event.lines.map((l) => ({ charactedId: l.characterId, line: l.line })),
      });

      mutateEvents((oldEvents) => {
        if (!oldEvents) {
          return;
        }

        const newEvents = oldEvents.map((oldEvent) => (oldEvent.id === updatedEvent.id ? updatedEvent : oldEvent));
        return newEvents;
      });
    }
  };

  const handleEventDelete = async (event: PlayscriptEvent) => {
    if (event.type === 'narrator') {
      await deleteNarratorEvent({ id: event.id });
    } else if ((event.type = 'character')) {
      await deleteCharacterEvent({ id: event.id });
    }

    mutateEvents((oldEvents) => oldEvents?.filter((e) => e.id !== event.id));
  };

  return (
    <div class="h-full w-full flex flex-col">
      {(() => {
        const currentPlayscript = playscript();
        console.log(currentPlayscript);
        if (currentPlayscript == undefined) {
          return <div>Loading</div>;
        }
        return (
          <>
            <div class="h-16 bg-slate-900 flex items-center justify-center">
              <input
                type="text"
                class="bg-transparent text-lg outline-none border-b-2"
                value={currentPlayscript.name}
                onChange={(e) => handlePlayscriptNameChange(e.currentTarget.value)}
              ></input>
            </div>

            <div class="flex flex-row border-b-4 border-b-slate-600">
              <PlayscriptEditorCharacters
                characters={currentPlayscript.characters}
                onChange={handleCharacterChange}
              ></PlayscriptEditorCharacters>
            </div>

            <Show when={events()} keyed={true}>
              {(events) => (
                <div class="grow overflow-auto">
                  <Index each={orderBy(events, (e) => e.index)}>
                    {(event, index) => (
                      <>
                        <EventRowButtons
                          onNewNarratorLine={() => handleNewNarratorLine(event().index)}
                          onNewCharacterLine={() => handleNewCharacterLine(event().index)}
                        ></EventRowButtons>
                        <EventRow
                          event={event()}
                          characters={currentPlayscript.characters}
                          onChange={handleEventChange}
                          onDelete={() => handleEventDelete(event())}
                        ></EventRow>
                      </>
                    )}
                  </Index>
                  <EventRowButtons
                    onNewNarratorLine={() => handleNewNarratorLine(max(events.map((e) => e.index + 1)) ?? 0)}
                    onNewCharacterLine={() => handleNewCharacterLine(max(events.map((e) => e.index + 1)) ?? 0)}
                  ></EventRowButtons>
                </div>
              )}
            </Show>
          </>
        );
      })()}
    </div>
  );
};
