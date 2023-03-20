import { Route, Routes } from '@solidjs/router';
import { Component } from 'solid-js';
import { HomePage } from './HomePage';
import { PlayRoomPage } from './playscript/playRoom/PlayRoomPage';
import { PlayscriptEditorPage } from './playscript/PlayscriptEditorPage';
import { PlayscriptPage } from './playscript/PlayscriptPage';

const App: Component = () => {
  return (
    <div class="text-white">
      <Routes>
        <Route path="/" component={HomePage}></Route>
        <Route path="/playscript/:id" component={PlayscriptPage}></Route>
        <Route path="/playscript/:id/edit" component={PlayscriptEditorPage}></Route>
        <Route path="/playroom/:id" component={PlayRoomPage}></Route>
      </Routes>
    </div>
  );
};

export default App;
