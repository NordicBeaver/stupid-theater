import { Component, For } from 'solid-js';
import { PlayscriptCharacter } from '../../api';
import { TextInput } from './TextInput';
import { orderBy } from 'lodash';

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

  const handleDescriptionChange = (id: string, newDescription: string) => {
    const character = props.characters.find((character) => character.id === id);
    if (!character) {
      return;
    }
    const newCharacter: PlayscriptCharacter = { ...character, description: newDescription };
    props.onChange?.(newCharacter);
  };

  return (
    <div class="w-full flex flex-row">
      <For each={orderBy(props.characters, (c) => c.order)}>
        {(character) => (
          <div class="h-full basis-0 grow flex flex-col">
            <div class="p-4 flex flex-col gap-2">
              <div>
                <TextInput
                  value={character.name}
                  onChange={(value) => handleNameChange(character.id, value)}
                ></TextInput>
              </div>
              <div>
                <TextInput
                  value={character.description}
                  onChange={(value) => handleDescriptionChange(character.id, value)}
                ></TextInput>
              </div>
            </div>
          </div>
        )}
      </For>
      {/* A spacer for the 'buttons' column */}
      <div class="w-16"></div>
    </div>
  );
};
