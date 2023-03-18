import { Component } from 'solid-js';
import { PlayscriptCharacter } from '../../api';
import { PlayscriptEvent } from '../Playscript';
import { CharacterEventRow } from './CharacterEventRow';
import { NarratorEventRow } from './NarratorEventRow';

export const EventRow: Component<{
  event: PlayscriptEvent;
  characters: PlayscriptCharacter[];
  onChange?: (event: PlayscriptEvent) => void;
}> = (props) => {
  return (
    <div>
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
    </div>
  );
};
