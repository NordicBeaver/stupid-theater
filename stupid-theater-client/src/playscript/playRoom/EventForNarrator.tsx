import { trim } from 'lodash';
import { Component } from 'solid-js';
import { PlayscriptCharacter } from '../../api';
import { Button } from '../../ui/Button';
import { PlayscriptEvent } from '../Playscript';

export const EventForNarrator: Component<{
  characters: PlayscriptCharacter[];
  event: PlayscriptEvent;
  onNextLine?: () => void;
}> = (props) => {
  return (
    <div class="w-full flex flex-col gap-12 items-center">
      <h2 class="text-xl">Narrator</h2>
      <div class="flex flex-col gap-4">
        {(() => {
          if (props.event.type === 'narrator') {
            return props.event.line;
          } else {
            return props.event.lines
              .filter((line) => trim(line.line).length > 0)
              .map((line) => (
                <div>
                  <p class="font-bold">{props.characters.find((c) => c.id === line.characterId)!.name}</p>
                  <p class="whitespace-pre-line">{line.line}</p>
                </div>
              ));
          }
        })()}
      </div>
      <div>
        <Button label="Next line" onClick={props.onNextLine}></Button>
      </div>
    </div>
  );
};
