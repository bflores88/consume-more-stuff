import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { connect } from 'react-redux';
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'K A N B A N',
    };
  }

  componentDidMount() {
    // return this.props.loadUsers() && this.props.loadCards() && console.log(this.props.cards);
  }

  render() {
    return (
      <div className="App">
        <h1>hello</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchtoProps = (dispatch) => {
  return {};
};

App = connect(
  mapStateToProps,
  mapDispatchtoProps,
)(App);

export default App;
