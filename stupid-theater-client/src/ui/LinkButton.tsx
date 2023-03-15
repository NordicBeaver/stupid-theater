import { A } from '@solidjs/router';
import { Component } from 'solid-js';

interface LinkButtonProps {
  label: string;
  href: string;
}

export const LinkButton: Component<LinkButtonProps> = (props) => {
  return (
    <A class="font-bold border-2 px-3 py-2 uppercase" href={props.href}>
      {props.label}
    </A>
  );
};
