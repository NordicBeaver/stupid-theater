type PlayscriptCharacterLine = {
  character: string;
  line: string;
};

export type PlayscriptCharacterEvent = {
  id: string;
  type: 'character';
  lines: PlayscriptCharacterLine[];
};

export type PlayscriptNarratorEvent = {
  id: string;
  type: 'narrator';
  line: string;
};

export type PlayscriptEvent = PlayscriptNarratorEvent | PlayscriptCharacterEvent;

export type Playscript = {
  name: string;
  events: PlayscriptEvent;
};
