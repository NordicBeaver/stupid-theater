import { Component } from 'solid-js';

export const EventRowButtons: Component<{
  onNewNarratorLine?: () => void;
  onNewCharacterLine?: () => void;
}> = (props) => {
  return (
    <div class="flex flex-row justify-end mr-16 gap-4 pl-4">
      <button class="bg-slate-800 px-4 py-1 rounded-2xl uppercase text-sm opacity-40" onClick={props.onNewNarratorLine}>
        New narrator line
      </button>
      <button
        class="bg-slate-800 px-4 py-1 rounded-2xl uppercase text-sm opacity-40"
        onClick={props.onNewCharacterLine}
      >
        New character line
      </button>
    </div>
  );
};
