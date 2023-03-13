import { Component, createSignal, For, Index } from 'solid-js';
import { Button } from '../ui/Button';
import { PlayscriptCharacterEvent, PlayscriptEvent, PlayscriptNarratorEvent } from './Playscript';

const CharacterEventRow: Component<{ event: PlayscriptCharacterEvent; characters: string[] }> = (props) => {
  return (
    <div class="flex flex-row">
      <For each={props.characters}>
        {(character) => (
          <div class="grow basis-0 p-4 border-2 border-slate-600">
            {props.event.lines.find((line) => line.character === character)?.line}
          </div>
        )}
      </For>
    </div>
  );
};

const NarratorEventRow: Component<{ event: PlayscriptNarratorEvent }> = (props) => {
  return <div class="p-4 border-2 border-slate-600">{props.event.line}</div>;
};

const EventRow: Component<{ event: PlayscriptEvent; characters: string[] }> = (props) => {
  return (
    <div>
      {props.event.type === 'character' ? (
        <CharacterEventRow event={props.event} characters={props.characters}></CharacterEventRow>
      ) : (
        <NarratorEventRow event={props.event}></NarratorEventRow>
      )}
    </div>
  );
};

export const PlayscriptEditor: Component = () => {
  const [playscriptName, setPlayscriptName] = createSignal('New Playscript');
  const [characters, setCharacters] = createSignal<string[]>([
    'Character 1',
    'Character 2',
    'Character 3',
    'Character 4',
  ]);
  const [events, setEvents] = createSignal<PlayscriptEvent[]>([
    { type: 'narrator', line: 'The story begins' },
    { type: 'character', lines: [{ character: 'Character 1', line: 'Hello everyone' }] },
    { type: 'character', lines: [{ character: 'Character 2', line: 'You suck' }] },
  ]);

  const addEvent = () => {
    setEvents((events) => [...events, { type: 'narrator', line: 'lil' }]);
  };

  return (
    <div class="h-full w-full flex flex-col">
      <div class="h-16 bg-slate-900 flex items-center justify-center">
        <input
          type="text"
          class="bg-transparent text-lg outline-none border-b-2"
          value={playscriptName()}
          onChange={(e) => setPlayscriptName(e.currentTarget.value)}
        ></input>
      </div>

      <div class="flex flex-row border-b-4 border-b-slate-600">
        <For each={characters()}>
          {(character) => (
            <div class="h-full basis-0 grow flex flex-col">
              <div class="p-4">{character}</div>
            </div>
          )}
        </For>
      </div>

      <div class="grow">
        <Index each={events()}>{(event) => <EventRow event={event()} characters={characters()}></EventRow>}</Index>
      </div>

      <div class="h-20 bg-slate-900 flex flex-row items-center justify-center gap-8">
        <Button label="Add character line"></Button>
        <Button label="Add narrator line" onClick={addEvent}></Button>
      </div>
    </div>
  );
};
