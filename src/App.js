import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { connect } from 'react-redux';
import { loadItems } from './actions';

import ItemsBox from './containers/ItemsBox';
import Item from './containers/Item';
import Header from './containers/Header';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'test',
    };
  }

  componentDidMount() {
    // return this.props.loadUsers() && this.props.loadCards() && console.log(this.props.cards);
    return this.props.loadItems();
  }

  render() {
    console.log(this.props.items);
    return (
      <div className="App">
        <Header />
        <h3>{this.state.title}</h3>
        <ItemsBox items={this.props.items} label="Electronics" />
        <ItemsBox items={this.props.items} label="Apparel" />
        <ItemsBox items={this.props.items} label="Books" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.itemReducer.items,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    loadItems: () => {
      return dispatch(loadItems());
    },
  };
};

App = connect(
  mapStateToProps,
  mapDispatchtoProps,
)(App);

export default App;
