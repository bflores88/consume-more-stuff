import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Header from './containers/Header';
import Registration from './containers/Registration';

import AddItem from './containers/AddItem';
import SideBox from './containers/SideBox/SideBox';
import EditItem from './containers/EditItem';
import Messages from './containers/Messages';
import Profiles from './containers/Profiles';
import Category from './containers/Category/Category';
import Footer from './containers/Footer/Footer';
import ItemDetail from './containers/ItemDetail/';
import NotAuthorized from './containers/NotAuthorized/NotAuthorized';
import UserItems from './containers/UserItems';
import PasswordUpdate from './containers/PasswordUpdate';

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
              <Route 
                path="/Register" 
                render={(props) => <Registration {...props} />}/>
              <Route path="/add-item" component={AddItem} />
              <Route path="/edit-item/:id" component={EditItem} />
              <Route path="/messages/:id" component={Messages} />
              <Route path="/profiles/settings" component={PasswordUpdate} />
              <Route path="/profiles/:id" component={Profiles} />
              <Route path="/users/:id/items" component={UserItems} />
              <Route path="/items/category/:category" component={Category} />
              <Route path="/items/:id" component={ItemDetail} />
              <Route path="/not-authorized" component={NotAuthorized} />
            </Switch>
          </div>
        </div>

        <Footer />
      </>
    );
  }
}

export default App;
