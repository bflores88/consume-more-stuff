import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AdminCategories.scss';
import { loadCategories } from '../../actions';

class AdminCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  componentDidMount() {
    return this.props.loadCategories();
  }

  render() {
    console.log(this.props.categories);
    const listCategories = this.props.categories.map((category, idx) => {

      return (
        <h2>{category.category_name}</h2>
      )
      
    })

    return (
      <>
        <div className="category-container">
          <h1> All Categories </h1>
          <div className="admin-categories">
            <div className="sub-div">Categories
              <br />
              {listCategories}
            </div>
            <div className="sub-div">Subcategories</div>
            <div className="sub-div">Add Categories</div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // items: state.itemReducer.items,
    // user: state.userReducer.user,
    categories: state.itemReducer.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // loadItems: () => dispatch(loadItems()),
    loadCategories: () => dispatch(loadCategories()),
  };
};

AdminCategories = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminCategories);

export default AdminCategories;
