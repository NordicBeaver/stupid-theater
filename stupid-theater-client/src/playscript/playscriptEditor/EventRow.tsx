import { Component } from 'solid-js';
import { PlayscriptEvent } from '../Playscript';
import { CharacterEventRow } from './CharacterEventRow';
import { NarratorEventRow } from './NarratorEventRow';

export const EventRow: Component<{
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
