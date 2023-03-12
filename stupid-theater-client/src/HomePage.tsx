import { A } from '@solidjs/router';
import { Component } from 'solid-js';

export const HomePage: Component = () => {
  return (
    <div class="h-screen w-screen bg-gray-800 flex flex-col justify-center items-center gap-4">
      <h1 class="text-white text-4xl">Stupid Theater</h1>
      <A href="/playscript" class="text-white font-bold border-2 px-3 py-2 uppercase">
        Create new play
      </A>
    </div>
  );
};
