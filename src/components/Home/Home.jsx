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

  componentDidMount() {
    this.props.loadCategories();
    return this.props.loadAllActiveItems();
  }

  checkAllActive(item) {
    return item.users.active === true;
  }

  render() {
    const categories = this.props.categories;
    const filteredItems = this.props.items.filter((item) => item.users.active && item.active);

    const filterByCategory = categories.map((category, idx) => {
      if (category.items.length) {
        const itemsArray = category.items.filter((item) => item.active);
      }

      return (<ItemsBox items={filteredItems} label={category.category_name} labelID={category.id} /> )
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
