type PlayscriptCharacterLine = {
  character: string;
  line: string;
};

export type PlayscriptCharacterEvent = {
  type: 'character';
  lines: PlayscriptCharacterLine[];
};

export type PlayscriptNarratorEvent = {
  type: 'narrator';
  line: string;
};

export type PlayscriptEvent = PlayscriptNarratorEvent | PlayscriptCharacterEvent;

export type Playscript = {
  name: string;
  events: PlayscriptEvent;
};
