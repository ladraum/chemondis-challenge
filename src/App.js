import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import AlbumGrid from './Album/AlbumGrid';
import NotFound from './NotFound/NotFound';
import PhotoGrid from './Photo/PhotoGrid';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={AlbumGrid} />
        <Route path="/photos/:albumId" exact component={PhotoGrid} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;