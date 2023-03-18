import { orderBy } from 'lodash';
import { Component, For } from 'solid-js';
import { PlayscriptCharacter } from '../../api';
import { PlayscriptCharacterEvent } from '../Playscript';
import { TextInput } from './TextInput';

export const CharacterEventRow: Component<{
  event: PlayscriptCharacterEvent;
  characters: PlayscriptCharacter[];
  onChange?: (event: PlayscriptCharacterEvent) => void;
}> = (props) => {
  const handleLineChange = (characterId: string, line: string) => {
    const newEvent: PlayscriptCharacterEvent = {
      ...props.event,
      lines: props.event.lines.map((characterLine) =>
        characterLine.characterId === characterId ? { ...characterLine, line: line } : characterLine
      ),
    };
    props.onChange?.(newEvent);
  };

  return (
    <div class="flex flex-row">
      <For each={orderBy(props.characters, (c) => c.order)}>
        {(character) => (
          <div class="grow basis-0 p-4 pb-6 border-2 border-slate-600">
            <TextInput
              value={props.event.lines.find((line) => line.characterId === character.id)?.line ?? ''}
              onChange={(value) => handleLineChange(character.id, value)}
            ></TextInput>
          </div>
        )}
      </For>
    </div>
  );
};
