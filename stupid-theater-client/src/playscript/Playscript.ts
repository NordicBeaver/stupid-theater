type PlayscriptCharacterLine = {
  characterId: string;
  line: string;
};

export type PlayscriptCharacterEvent = {
  id: string;
  type: 'character';
  index: number;
  lines: PlayscriptCharacterLine[];
};

export type PlayscriptNarratorEvent = {
  id: string;
  type: 'narrator';
  index: number;
  line: string;
};

export type PlayscriptEvent = PlayscriptNarratorEvent | PlayscriptCharacterEvent;

export type Playscript = {
  name: string;
  events: PlayscriptEvent;
};
