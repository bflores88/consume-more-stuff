import React from 'react';
import './Home.scss';
import { connect } from 'react-redux';
import { loadItems } from '../../actions';

import ItemsBox from '../../containers/ItemsBox';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'test',
    };
  }
  d;

  componentDidMount() {
    // return this.props.loadUsers() && this.props.loadCards() && console.log(this.props.cards);
    return this.props.loadItems();
  }

  render() {
    return (
      <div className="App">
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

Home = connect(
  mapStateToProps,
  mapDispatchtoProps,
)(Home);

export default Home;
