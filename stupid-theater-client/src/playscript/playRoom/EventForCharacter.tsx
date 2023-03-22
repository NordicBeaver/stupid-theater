import { trim } from 'lodash';
import { Component, createEffect, createSignal } from 'solid-js';
import { PlayscriptCharacter } from '../../api';
import { PlayscriptEvent } from '../Playscript';

export const EventForCharacter: Component<{
  event: PlayscriptEvent;
  characters: PlayscriptCharacter[];
  characterId: string;
}> = (props) => {
  const [character, setCharacter] = createSignal<PlayscriptCharacter | null>(null);
  createEffect(() => {
    const newCharacter = props.characters.find((c) => c.id === props.characterId)!;
    setCharacter(newCharacter);
  });

  const [line, setLine] = createSignal<string | null>(null);
  createEffect(() => {
    if (props.event.type === 'narrator') {
      return setLine(null);
    }

    const newLine = props.event.lines.find((l) => l.characterId === props.characterId);
    if (!newLine || trim(newLine.line).length === 0) {
      return setLine(null);
    }

    return setLine(newLine.line);
  });

  return (
    <div>
      <h1>{character()?.name}</h1>
      <div>
        {(() => {
          if (props.event.type === 'narrator') {
            return 'Wait...';
          } else if (line() != null) {
            return line();
          } else {
            return 'Wait...';
          }
        })()}
      </div>
    </div>
  );
};
