import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Popular from './popular/Popular';
import Nav from './Nav';
import Home from './Home';
import Battle from './battle/Battle';
import Results from './battle/Results';


const App = () => (
  <Router>
    <div className="app">
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/battle" component={Battle} />
        <Route path="/battle/results" component={Results} />
        <Route path="/popular" component={Popular} />
        <Route render={() => <p>Not found</p>} />
      </Switch>
    </div>
  </Router>
);

export default App;
