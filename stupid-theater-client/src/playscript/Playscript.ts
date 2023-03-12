type PlayscriptCharacterLine = {
  character: string;
  line: string;
};

type PlayscriptCharacterLines = {
  type: 'character';
  lines: PlayscriptCharacterLine[];
};

type PlayscriptNarratorLine = {
  type: 'narrator';
  line: string;
};

export type PlayscriptEvent = PlayscriptNarratorLine | PlayscriptCharacterLines;

export type Playscript = {
  name: string;
  events: PlayscriptEvent;
};
