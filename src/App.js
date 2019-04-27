import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Album from './Album/Album';
import NotFound from './NotFound/NotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Album} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;