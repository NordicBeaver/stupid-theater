import { sortBy } from 'lodash';
import { Component, For } from 'solid-js';
import { Playscript } from '../../api';
import { Button } from '../../ui/Button';

export const CharacterSelect: Component<{
  playscript: Playscript;
  onSelect?: (charactedId: string) => void;
}> = (props) => {
  return (
    <div class="flex flex-col gap-12">
      <h1 class="text-4xl">Select a character</h1>
      <div class="flex flex-col gap-4">
        <For each={sortBy(props.playscript.characters, (c) => c.order)}>
          {(character) => <Button label={character.name} onClick={() => props.onSelect?.(character.id)}></Button>}
        </For>
        <Button label="Join as narrator" onClick={() => props.onSelect?.('narrator')}></Button>
      </div>
    </div>
  );
};
