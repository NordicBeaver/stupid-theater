import { Component, JSXElement } from 'solid-js';

export const Page: Component<{ children?: JSXElement }> = (props) => {
  return <div class="h-screen w-screen bg-gray-800">{props.children}</div>;
};
