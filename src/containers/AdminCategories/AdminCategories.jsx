import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AdminCategories.scss';
import { loadCategories } from '../../actions';
import AdminAddCategory from '../../components/AdminAddCategory';
import AdminAddSubcategory from '../../components/AdminAddSubcategory';

class AdminCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategory: '',
      clicked: 'not-clicked',
      subCategories: '',
      displayAddCategory: 'hide-div',
      displayAddSubcategory: 'hide-div',
    };

    this.handleSelectCategory = this.handleSelectCategory.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.reloadOnSubmit = this.reloadOnSubmit.bind(this);
  }

  componentDidMount() {
    return this.props.loadCategories();
  }

  reloadOnSubmit() {
    return this.props.loadCategories();
  }

  displaySubCat(category, allCategories) {
    const currentCategory = allCategories.filter((cat) => cat.category_name === category);
    this.setState({
      subCategories: currentCategory[0].sub_categories,
    });
  }

  handleSelectCategory(e) {
    e.preventDefault();
    this.setState({
      selectedCategory: e.currentTarget.value,
    });
    return this.displaySubCat(e.currentTarget.value, this.props.categories);
  }

  handleAdd(e) {
    e.preventDefault();
    if (e.currentTarget.name === 'displayAddSubcategory') {
      if (this.state.displayAddSubcategory === 'hide-div') {
        this.setState({
          displayAddSubcategory: 'display-div',
          displayAddCategory: 'hide-div',
        });
      } else {
        this.setState({
          displayAddSubcategory: 'hide-div',
          displayAddCategory: 'hide-div',
        });
      }
    } else {
      if (this.state.displayAddCategory === 'hide-div') {
        this.setState({
          displayAddSubcategory: 'hide-div',
          displayAddCategory: 'display-div',
        });
      } else
        this.setState({
          displayAddSubcategory: 'hide-div',
          displayAddCategory: 'hide-div',
        });
    }
  }

  render() {
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
              <button name="displayAddCategory" onClick={this.handleAdd}>
                <h3>+ Category</h3>
              </button>
              <div className={this.state.displayAddCategory}>
                <AdminAddCategory reload={this.reloadOnSubmit} />
              </div>
              <button name="displayAddSubcategory" onClick={this.handleAdd}>
                <h3>+ Subcategory</h3>
              </button>
              <div className={this.state.displayAddSubcategory}>
                <AdminAddSubcategory categories={this.props.categories} reload={this.reloadOnSubmit} />
              </div>
            </div>
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
