import { useParams } from '@solidjs/router';
import { Component, createResource, createSignal, For, Index, Show } from 'solid-js';
import { findPlayscript, Playscript, PlayscriptCharacter, updateCharacter, updatePlayscript } from '../../api';
import { PlayscriptEvent } from '../Playscript';
import { EventRow } from './EventRow';
import { PlayscriptEditorCharacters } from './PlayscriptEditorCharacters';

export const PlayscriptEditor: Component = () => {
  const [characters, setCharacters] = createSignal<string[]>([
    'Character 1',
    'Character 2',
    'Character 3',
    'Character 4',
  ]);
  // TODO: turn into store?
  const [events, setEvents] = createSignal<PlayscriptEvent[]>([
    { id: crypto.randomUUID(), type: 'narrator', line: 'The story begins' },
    {
      id: crypto.randomUUID(),
      type: 'character',
      lines: [
        { character: 'Character 1', line: '- Hello everyone' },
        { character: 'Character 2', line: '' },
        { character: 'Character 3', line: '' },
        { character: 'Character 4', line: '' },
      ],
    },
    {
      id: crypto.randomUUID(),
      type: 'character',
      lines: [
        { character: 'Character 1', line: '' },
        { character: 'Character 2', line: '- Hi' },
        { character: 'Character 3', line: '- Hello' },
        { character: 'Character 4', line: "- I'm stupid" },
      ],
    },
  ]);

  const params = useParams<{ id: string }>();

  const [playscript, { mutate: mutatePlayscript }] = createResource(() => findPlayscript(params.id));

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

  const handleNewNarratorLine = (index: number) => {
    const newEvents = [...events()];
    newEvents.splice(index + 1, 0, { id: crypto.randomUUID(), type: 'narrator', line: '' });
    setEvents(newEvents);
  };

  const handleNewCharacterLine = (index: number) => {
    const newEvents = [...events()];
    newEvents.splice(index + 1, 0, {
      id: crypto.randomUUID(),
      type: 'character',
      lines: [
        { character: 'Character 1', line: '' },
        { character: 'Character 2', line: '' },
        { character: 'Character 3', line: '' },
        { character: 'Character 4', line: '' },
      ],
    });
    setEvents(newEvents);
  };

  const handleEventChange = (event: PlayscriptEvent) => {
    setEvents((events) =>
      events.map((e) => {
        if (e.id === event.id) {
          return event;
        } else {
          return e;
        }
      })
    );
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

            <div class="grow overflow-auto">
              <Index each={events()}>
                {(event, index) => (
                  <EventRow
                    event={event()}
                    characters={characters()}
                    onChange={handleEventChange}
                    onNewNarratorLine={() => handleNewNarratorLine(index)}
                    onNewCharacterLine={() => handleNewCharacterLine(index)}
                  ></EventRow>
                )}
              </Index>
            </div>
          </>
        );
      })()}
    </div>
  );
};
