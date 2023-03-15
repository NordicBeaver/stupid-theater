import { Component, For } from 'solid-js';
import { PlayscriptCharacter } from '../../api';
import { TextInput } from './TextInput';

export const PlayscriptEditorCharacters: Component<{
  characters: PlayscriptCharacter[];
  onChange?: (characster: PlayscriptCharacter) => void;
}> = (props) => {
  const handleNameChange = (id: string, newName: string) => {
    const character = props.characters.find((character) => character.id === id);
    if (!character) {
      return;
    }
    const newCharacter: PlayscriptCharacter = { ...character, name: newName };
    props.onChange?.(newCharacter);
  };

  return (
    <div class="w-full flex flex-row">
      <For each={props.characters}>
        {(character) => (
          <div class="h-full basis-0 grow flex flex-col">
            <div class="p-4">
              <TextInput value={character.name} onChange={(value) => handleNameChange(character.id, value)}></TextInput>
            </div>
          </div>
        )}
      </For>
    </div>
  );
};
