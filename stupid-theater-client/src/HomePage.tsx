import { A } from '@solidjs/router';
import { Component, createEffect, createResource, For } from 'solid-js';
import { listPlayscripts } from './api';

export const HomePage: Component = () => {
  const [playscripts] = createResource(listPlayscripts);

  return (
    <div class="h-screen w-screen bg-gray-800 flex flex-col justify-center items-center gap-4">
      <h1 class="text-4xl">Stupid Theater</h1>
      <ul>
        <For each={playscripts()}>
          {(playscript) => (
            <li>
              <A href={`/playscript/${playscript.id}`}>{playscript.name}</A>
            </li>
          )}
        </For>
      </ul>
      <A href="/playscript" class="font-bold border-2 px-3 py-2 uppercase">
        Create new play
      </A>
    </div>
  );
};
