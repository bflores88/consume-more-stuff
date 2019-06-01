import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Header from './containers/Header';

import AddItem from './containers/AddItem';
import SideBox from './containers/SideBox/SideBox';
import EditItem from './containers/EditItem';
import Messages from './containers/Messages';
import Users from './containers/Users';
import Category from './containers/Category/Category';
import Footer from './containers/Footer/Footer';
import ItemDetail from './containers/ItemDetail/';

class App extends Component {
  render() {
    return (
      <>
        <Header />

        <div className="main">
          <SideBox currentUser={this.props.currentUser} />
          <div className="page">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/add-item" component={AddItem} />
              <Route path="/edit-item" component={EditItem} />
              <Route path="/messages/:id" component={Messages} />
              <Route path="/users/:id" component={Users} />
              <Route path="/items/category/:category" component={Category} />
              <Route path="/items/:id" component={ItemDetail} />
            </Switch>
          </div>
        </div>

        <Footer />
      </>
    );
  }
}

export default App;
