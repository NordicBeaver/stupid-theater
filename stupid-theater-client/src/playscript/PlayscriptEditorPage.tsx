import { Component } from 'solid-js';
import { PlayscriptEditor } from './playscriptEditor/PlayscriptEditor';

export const PlayscriptEditorPage: Component = () => {
  return (
    <div class="h-screen w-screen bg-gray-800 flex flex-col justify-center items-center gap-4">
      <PlayscriptEditor></PlayscriptEditor>
    </div>
  );
};
