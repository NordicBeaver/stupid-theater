import { Route, Routes } from '@solidjs/router';
import { Component } from 'solid-js';
import { HomePage } from './HomePage';
import { PlayscriptPage } from './PlayscriptPage';

const App: Component = () => {
  return (
    <Routes>
      <Route path="/" component={HomePage}></Route>
      <Route path="/playscript" component={PlayscriptPage}></Route>
    </Routes>
  );
};

export default App;
