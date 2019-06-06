import React, { Component } from 'react';
import './CategoryLinks.scss';
import { connect } from 'react-redux';
import { loadCategories, loadAllActiveItems } from '../../actions';
import { Link } from 'react-router-dom';

class CategoryLinks extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.loadAllActiveItems();
    return this.props.loadCategories();
  }

  render() {
    const categories = this.props.categories.map((category, idx) => {
      let category_name = category.category_name;
      let link = `/items/category/${category_name}`;
      let id = category.id;

      const checkAnyActiveItems = this.props.items
        .filter((item) => {
          return item.category_id === id;
        })
        .some((item) => item.users.active);

      if (checkAnyActiveItems) {
        return (
          <Link to={link}>
            <button>{category_name}</button>
          </Link>
        );
      }
    });

    return categories;
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.itemReducer.categories,
    items: state.itemReducer.allActiveItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCategories: () => dispatch(loadCategories()),
    loadAllActiveItems: () => dispatch(loadAllActiveItems()),
  };
};

CategoryLinks = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryLinks);

export default CategoryLinks;
