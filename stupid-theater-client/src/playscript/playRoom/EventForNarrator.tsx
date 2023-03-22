import { Component } from 'solid-js';
import { PlayscriptCharacter } from '../../api';
import { PlayscriptEvent } from '../Playscript';

export const EventForNarrator: Component<{
  characters: PlayscriptCharacter[];
  event: PlayscriptEvent;
}> = (props) => {
  return (
    <div>
      <h1>Narrator</h1>
      <div>
        {(() => {
          if (props.event.type === 'narrator') {
            return props.event.line;
          } else {
            return props.event.lines.map((line) => (
              <div>
                {props.characters.find((c) => c.id === line.characterId)!.name}: {line.line}
              </div>
            ));
          }
        })()}
      </div>
    </div>
  );
};
