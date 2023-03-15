import { Component, For } from 'solid-js';
import { PlayscriptCharacterEvent } from '../Playscript';
import { TextInput } from './TextInput';

export const CharacterEventRow: Component<{
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
