import { Component } from 'solid-js';

export const EventRowButtons: Component<{
  onNewNarratorLine?: () => void;
  onNewCharacterLine?: () => void;
}> = (props) => {
  return (
    <div class="flex flex-row gap-4">
      <button class="bg-slate-900 px-4 py-1 rounded-2xl uppercase text-sm" onClick={props.onNewNarratorLine}>
        New narrator line
      </button>
      <button class="bg-slate-900 px-4 py-1 rounded-2xl uppercase text-sm" onClick={props.onNewCharacterLine}>
        New character line
      </button>
    </div>
  );
};
