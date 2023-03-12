import { Component } from 'solid-js';

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export const Button: Component<ButtonProps> = (props) => {
  return (
    <button class="font-bold border-2 px-3 py-2 uppercase" onClick={props.onClick}>
      {props.label}
    </button>
  );
};
