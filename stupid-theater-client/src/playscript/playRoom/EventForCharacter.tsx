import { trim } from 'lodash';
import { Component, createEffect, createSignal, on } from 'solid-js';
import { PlayscriptCharacter } from '../../api';
import { PlayscriptEvent } from '../Playscript';
import meow from '../../assets//cat-meow-6226.mp3';

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

  var meowAudio = new Audio(meow);
  meowAudio.volume = 0.4;

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

  createEffect(() => {
    if (line()) {
      meowAudio.play();
    }
  });

  return (
    <div class="w-full flex flex-col gap-12 items-center">
      <h2 class="text-xl">{character()?.name}</h2>
      <div class="text-lg">
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
