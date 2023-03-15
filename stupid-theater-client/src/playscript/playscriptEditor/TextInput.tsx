import { Component, createSignal, createEffect, on } from 'solid-js';

export const TextInput: Component<{ value: string; onChange?: (value: string) => void }> = (props) => {
  let textareaRef: HTMLTextAreaElement | undefined;
  const [currentValue, setCurrentValue] = createSignal(props.value);

  createEffect(() => {
    setCurrentValue(props.value);
  });

  createEffect(
    on(currentValue, () => {
      if (!textareaRef) {
        return;
      }
      textareaRef.style.height = '0px';
      const fullHeight = textareaRef.scrollHeight;
      textareaRef.style.height = `${fullHeight}px`;
    })
  );

  return (
    <textarea
      ref={textareaRef}
      class="bg-transparent outline-none resize-none w-full"
      value={currentValue()}
      oninput={(e) => setCurrentValue(e.currentTarget.value)}
      onChange={(e) => props.onChange?.(e.currentTarget.value)}
    ></textarea>
  );
};
