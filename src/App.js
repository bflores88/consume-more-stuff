import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import Home from './components/Home';
import AddItem from './components/AddItem';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/AddItem" component={AddItem} />
        </Switch>

        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default App;
