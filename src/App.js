import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Header from './containers/Header';
import SearchResults from './containers/SearchResults';

import Registration from './containers/Registration';
import LoginPage from './containers/LoginPage';

import AddItem from './containers/AddItem';
import SideBox from './containers/SideBox/SideBox';
import EditItem from './containers/EditItem';
import Messages from './containers/Messages';
import Profiles from './containers/Profiles';
import Category from './containers/Category/Category';
import Footer from './containers/Footer/Footer';
import ItemDetail from './containers/ItemDetail/';
import AdminAllUsers from './containers/AdminAllUsers';

import NotAuthorized from './containers/NotAuthorized/NotAuthorized';
import UserItems from './containers/UserItems';
import PasswordUpdate from './containers/PasswordUpdate';

import Conversation from './containers/Conversation';
import AddThread from './containers/AddThread';
import AccountDeactivate from './containers/AccountDeactivate/AccountDeactivate';
import AdminAllItems from './containers/AdminAllItems';
import UserCart from './containers/UserCart';
import Checkout from './containers/Checkout';
import AdminCategories from './containers/AdminCategories';

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
              <Route path="/Register" render={(props) => <Registration {...props} />} />
              <Route path="/login" component={LoginPage} />
              <Route path="/search-results" component={SearchResults} />
              <Route path="/add-item" component={AddItem} />
              <Route path="/edit-item/:id" component={EditItem} />
              <Route path="/messages/:id" component={Messages} />
              <Route path="/profiles/settings" component={PasswordUpdate} />
              <Route path="/profiles/:id/deactivate" component={AccountDeactivate} />
              <Route path="/profiles/:id" component={Profiles} />
              <Route path="/users/:id/items" component={UserItems} />
              <Route path="/items/category/:category" component={Category} />
              <Route path="/items/:id" component={ItemDetail} />
              <Route path="/not-authorized" component={NotAuthorized} />
              <Route path="/add-thread" component={AddThread} />
              <Route path="/messages" component={Messages} />
              <Route path="/conversation/:id" component={Conversation} />
              <Route path="/admin-categories" component={AdminCategories} />
              <Route path="/admin-items" component={AdminAllItems} />
              <Route path="/admin-users" component={AdminAllUsers} />
              <Route path="/cart" component={UserCart} />
              <Route path="/checkout" component={Checkout} />
            </Switch>
          </div>
        </div>

        <Footer />
      </>
    );
  }
}

export default App;
