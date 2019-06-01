import React, { Component } from 'react';
import './CategoryLinks.scss';
import { connect } from 'react-redux';
import { loadCategories } from '../../actions';
import { Link } from 'react-router-dom';

class CategoryLinks extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    return this.props.loadCategories();
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.match.params.id !== prevProps.match.params.id) {
  //     return this.props.loadSpecificItem(this.props.match.params.id);
  //   }
  // }

  render() {
    const categories = this.props.categories.map((category, idx) => {
      let categoryName = category.categoryName;
      let link = `/items/category/${categoryName}`;
      return (
        <Link to={link}>
          <button>{categoryName}</button>
        </Link>
      );
    });

    return categories;
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.itemReducer.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCategories: () => dispatch(loadCategories()),
  };
};

CategoryLinks = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryLinks);

export default CategoryLinks;
