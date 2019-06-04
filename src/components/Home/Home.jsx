import React from 'react';
import './Home.scss';
import { connect } from 'react-redux';
import { loadAllActiveItems, loadCategories } from '../../actions';

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
    this.props.loadCategories();
    return this.props.loadAllActiveItems();
  }

  componentDidUpdate() {}

  render() {
    const categories = this.props.categories;

    const filterByCategory = categories.map((category, idx) => {
      return <ItemsBox items={this.props.items} label={category.categoryName} labelID={category.id} />;
    });

    return <div className="App">{filterByCategory}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.itemReducer.allActiveItems,
    categories: state.itemReducer.categories,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    loadAllActiveItems: () => dispatch(loadAllActiveItems()),
    loadCategories: () => dispatch(loadCategories()),
  };
};

Home = connect(
  mapStateToProps,
  mapDispatchtoProps,
)(Home);

export default Home;
