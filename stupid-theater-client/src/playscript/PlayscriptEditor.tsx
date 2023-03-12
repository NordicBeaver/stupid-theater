import { Component, createSignal, For } from 'solid-js';
import { Button } from '../ui/Button';
import { PlayscriptEvent } from './Playscript';

export const PlayscriptEditor: Component = () => {
  const [playscriptName, setPlayscriptName] = createSignal('New Playscript');
  const [characters, setCharacters] = createSignal<string[]>([
    'Character 1',
    'Character 2',
    'Character 3',
    'Character 4',
  ]);
  const [events, setEvents] = createSignal<PlayscriptEvent[]>([]);

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

      <div class="grow flex flex-row">
        <For each={characters()}>
          {(character) => (
            <div class="h-full basis-0 grow flex flex-col">
              <div class="grow"></div>
              <div>{character}</div>
            </div>
          )}
        </For>
      </div>

      <div class="h-20 bg-slate-900 flex flex-row items-center justify-center gap-8">
        <Button label="Add character line"></Button>
        <Button label="Add narrator line"></Button>
      </div>
    </div>
  );
};
