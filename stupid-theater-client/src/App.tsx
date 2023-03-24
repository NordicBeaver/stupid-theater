import { Route, Routes } from '@solidjs/router';
import NoSleep from 'nosleep.js';
import { Component, createSignal } from 'solid-js';
import { HomePage } from './HomePage';
import { PlayRoomPage } from './playscript/playRoom/PlayRoomPage';
import { PlayscriptEditorPage } from './playscript/PlayscriptEditorPage';
import { PlayscriptPage } from './playscript/PlayscriptPage';

const noSleep = new NoSleep();

const App: Component = () => {
  const [isNoSleepActive, setIsNoSleepActive] = createSignal(false);

  const toggleNoSleep = () => {
    if (isNoSleepActive() === false) {
      noSleep.enable();
      setIsNoSleepActive(true);
    } else {
      noSleep.disable();
      setIsNoSleepActive(false);
    }
  };

  return (
    <div class="text-white relative">
      <Routes>
        <Route path="/" component={HomePage}></Route>
        <Route path="/playscript/:id" component={PlayscriptPage}></Route>
        <Route path="/playscript/:id/edit" component={PlayscriptEditorPage}></Route>
        <Route path="/playroom/:id" component={PlayRoomPage}></Route>
      </Routes>

      <div
        class={`absolute p-4 top-4 right-4 text-xl ${isNoSleepActive() ? 'opacity-100' : 'opacity-40'}`}
        onClick={toggleNoSleep}
      >
        S
      </div>
    </div>
  );
};

export default App;
