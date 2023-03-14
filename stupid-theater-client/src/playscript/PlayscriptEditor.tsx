import { Component, createEffect, createSignal, For, Index, on } from 'solid-js';
import { Button } from '../ui/Button';
import { PlayscriptCharacterEvent, PlayscriptEvent, PlayscriptNarratorEvent } from './Playscript';

const TextInput: Component<{ value: string; onChange?: (value: string) => void }> = (props) => {
  let textareaRef: HTMLTextAreaElement | undefined;
  const [currentValue, setCurrentValue] = createSignal(props.value);

  createEffect(() => {
    setCurrentValue(props.value);
  });

  createEffect(
    on(currentValue, () => {
      if (!textareaRef) {
        return;
      }
      textareaRef.style.height = '0px';
      const fullHeight = textareaRef.scrollHeight;
      textareaRef.style.height = `${fullHeight}px`;
    })
  );

  return (
    <textarea
      ref={textareaRef}
      class="bg-transparent outline-none resize-none w-full"
      value={currentValue()}
      oninput={(e) => setCurrentValue(e.currentTarget.value)}
      onChange={(e) => props.onChange?.(e.currentTarget.value)}
    ></textarea>
  );
};

const CharacterEventRow: Component<{
  event: PlayscriptCharacterEvent;
  characters: string[];
  onChange?: (event: PlayscriptCharacterEvent) => void;
}> = (props) => {
  const handleLineChange = (character: string, line: string) => {
    const newEvent: PlayscriptCharacterEvent = {
      ...props.event,
      lines: props.event.lines.map((characterLine) =>
        characterLine.character === character ? { ...characterLine, line: line } : characterLine
      ),
    };
    props.onChange?.(newEvent);
  };

  return (
    <div class="flex flex-row">
      <For each={props.characters}>
        {(character) => (
          <div class="grow basis-0 p-4 pb-6 border-2 border-slate-600">
            <TextInput
              value={props.event.lines.find((line) => line.character === character)?.line ?? ''}
              onChange={(value) => handleLineChange(character, value)}
            ></TextInput>
          </div>
        )}
      </For>
    </div>
  );
};

const NarratorEventRow: Component<{
  event: PlayscriptNarratorEvent;
  onChange?: (event: PlayscriptNarratorEvent) => void;
}> = (props) => {
  const handleTextChange = (text: string) => {
    const updatedEvent: PlayscriptNarratorEvent = { ...props.event, line: text };
    props.onChange?.(updatedEvent);
  };

  return (
    <div class="p-4 pb-6 border-2 border-slate-600">
      <TextInput value={props.event.line} onChange={handleTextChange}></TextInput>
    </div>
  );
};

const EventRow: Component<{
  event: PlayscriptEvent;
  characters: string[];
  onChange?: (event: PlayscriptEvent) => void;
  onNewNarratorLine?: () => void;
  onNewCharacterLine?: () => void;
}> = (props) => {
  return (
    <div class="relative">
      <div>
        {props.event.type === 'character' ? (
          <CharacterEventRow
            event={props.event}
            characters={props.characters}
            onChange={props.onChange}
          ></CharacterEventRow>
        ) : (
          <NarratorEventRow event={props.event} onChange={props.onChange}></NarratorEventRow>
        )}
      </div>
      <div class="absolute right-4 bottom-0 translate-y-1/2 z-10 flex flex-row gap-4">
        <button class="bg-slate-900 px-4 py-1 rounded-2xl uppercase text-sm" onClick={props.onNewNarratorLine}>
          New narrator line
        </button>
        <button class="bg-slate-900 px-4 py-1 rounded-2xl uppercase text-sm" onClick={props.onNewCharacterLine}>
          New character line
        </button>
      </div>
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
    </div>
  );
};
