import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AdminCategories.scss';
import { loadCategories } from '../../actions';
import AdminCategoryButton from '../../components/AdminCategoryButton';
import { all } from 'bluebird';

class AdminCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategory: '',
      clicked: 'not-clicked',
      subCategories: '',
    };

    this.handleSelectCategory = this.handleSelectCategory.bind(this);
  }

  componentDidMount() {
    return this.props.loadCategories();
  }

  displaySubCat(category, allCategories) {
    console.log(category);
    console.log(allCategories);
    const currentCategory = allCategories.filter((cat) => cat.category_name === category);
    console.log('current', currentCategory[0].sub_categories);
    this.setState({
      subCategories: currentCategory[0].sub_categories,
    });
  }

  handleSelectCategory(e) {
    e.preventDefault();
    this.setState({
      selectedCategory: e.currentTarget.value
    })
    return this.displaySubCat(e.currentTarget.value, this.props.categories);
  }

  render() {
    console.log(this.state.subCategories);
    const listCategories = this.props.categories.map((category, idx) => {
      return (
        <button value={category.category_name} onClick={this.handleSelectCategory}>
          <h2>{category.category_name}</h2>
        </button>
      );
    });

    let listSubCategories = '';

    if (this.state.subCategories) {
      listSubCategories = this.state.subCategories.map((subCat, idx) => {
        return <h3>{subCat.sub_category_name}</h3>;
      });
    }

    return (
      <>
        <div className="category-container">
          <h1> All Categories </h1>
          <div className="admin-categories">
            <div className="sub-div">
              <h1>Categories</h1>
              <br />
              {listCategories}
            </div>
            <div className="sub-div">
              <h1>{this.state.selectedCategory} Subcategories</h1>
              <br />
              {listSubCategories}
            </div>
            <div className="sub-div">
              <h1>Add Categories</h1>
            </div>
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
