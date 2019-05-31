import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import Home from './components/Home';
import Header from './containers/Header';


import ItemDetails from './containers/ItemDetail';

import AddItem from './components/AddItem';

import SideBox from './containers/SideBox/SideBox';
import EditItem from './containers/EditItem';
import Messages from './containers/Messages';
import Users from './containers/Users';
import Category from './containers/Category/Category';


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
              <Route path="/add-item" component={AddItem} />
              <Route path="/edit-item" component={EditItem} />
              <Route path="/messages" component={Messages} />
              <Route path="/users" component={Users} />
              <Route path="/items/category/:category" component={Category} />
            </Switch>
          </div>
        </div>
      </>


    );
  }
}

export default App;
