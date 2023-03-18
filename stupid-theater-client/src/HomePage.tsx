import { A, useNavigate } from '@solidjs/router';
import { Component, createResource, For } from 'solid-js';
import { createPlayscript, listPlayscripts } from './api';
import { Button } from './ui/Button';

export const HomePage: Component = () => {
  const [playscripts] = createResource(listPlayscripts);

  const navigate = useNavigate();

  const handleCreateNewButtonClick = async () => {
    const playscript = await createPlayscript({ name: 'New playscript' });
    navigate(`/playscript/${playscript.id}`);
  };

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
      <Button label="Create new play" onClick={handleCreateNewButtonClick}></Button>
    </div>
  );
};
