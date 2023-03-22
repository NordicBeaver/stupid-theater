import { Component } from 'solid-js';
import { PlayscriptCharacter } from '../../api';
import { PlayscriptEvent } from '../Playscript';
import { EventForCharacter } from './EventForCharacter';
import { EventForNarrator } from './EventForNarrator';

export const PlayscriptEventCard: Component<{
  event: PlayscriptEvent;
  characters: PlayscriptCharacter[];
  characterId: string;
  onNextLine?: () => void;
}> = (props) => {
  return (
    <div>
      {props.characterId === 'narrator' ? (
        <EventForNarrator
          event={props.event}
          characters={props.characters}
          onNextLine={props.onNextLine}
        ></EventForNarrator>
      ) : (
        <EventForCharacter
          event={props.event}
          characters={props.characters}
          characterId={props.characterId}
        ></EventForCharacter>
      )}
    </div>
  );
};
