import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import Home from './components/Home';
import Header from './containers/Header';

import ItemDetails from './containers/ItemDetail';

import AddItem from './components/AddItem';
import SideBox from './containers/SideBox/SideBox';


class App extends Component {
  render() {
    return (
      <>
        <Header />


        <div className="main">
          <SideBox />
          <div className="page">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/AddItem" component={AddItem} />
            </Switch>
          </div>
        </div>
      </>


    );
  }
}

export default App;
