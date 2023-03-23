import { Component } from 'solid-js';
import { PlayscriptCharacter } from '../../api';
import { Button } from '../../ui/Button';
import { PlayscriptEvent } from '../Playscript';
import { CharacterEventRow } from './CharacterEventRow';
import { NarratorEventRow } from './NarratorEventRow';

export const EventRow: Component<{
  event: PlayscriptEvent;
  characters: PlayscriptCharacter[];
  onChange?: (event: PlayscriptEvent) => void;
  onDelete?: () => void;
}> = (props) => {
  return (
    <div>
      <div class="flex">
        <div class="grow">
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
        <div class="w-16 flex items-center justify-center opacity-40">
          <Button label="DEL" onClick={props.onDelete}></Button>
        </div>
      </div>
    </div>
  );
};
