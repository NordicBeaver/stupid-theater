import { Component } from 'solid-js';
import { PlayscriptNarratorEvent } from '../Playscript';
import { TextInput } from './TextInput';

export const NarratorEventRow: Component<{
  event: PlayscriptNarratorEvent;
  onChange?: (event: PlayscriptNarratorEvent) => void;
}> = (props) => {
  const handleTextChange = (text: string) => {
    const updatedEvent: PlayscriptNarratorEvent = { ...props.event, line: text };
    props.onChange?.(updatedEvent);
  };

  return (
    <div class="p-4 pb-6 border-2 border-slate-600">
      <TextInput value={props.event.line} onChange={handleTextChange}></TextInput>
    </div>
  );
};
