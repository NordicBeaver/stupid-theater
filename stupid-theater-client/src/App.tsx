import { Route, Routes } from '@solidjs/router';
import { Component } from 'solid-js';
import { HomePage } from './HomePage';
import { PlayscriptPage } from './playscript/PlayscriptPage';

const App: Component = () => {
  return (
    <div class="text-white">
      <Routes>
        <Route path="/" component={HomePage}></Route>
        <Route path="/playscript" component={PlayscriptPage}></Route>
      </Routes>
    </div>
  );
};

export default App;
