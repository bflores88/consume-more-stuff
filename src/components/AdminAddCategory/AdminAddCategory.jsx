import React, { Component } from 'react';
import './AdminAddCategory.scss';
import { connect } from 'react-redux';
import { addCategory } from '../../actions';

class AdminAddCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newCategory: '',
    };

    this.handleCategoryInput = this.handleCategoryInput.bind(this);
    this.handleSubcategoryInput = this.handleSubcategoryInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCategoryInput(e) {
    e.preventDefault();
    const value = e.target.value;
    this.setState({
      newCategory: value,
    });
  }

  handleSubcategoryInput(e) {
    e.preventDefault();
    const value = e.target.value;
    this.setState({
      [`${e.target.name}`]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const data = {
      category_name: this.state.newCategory
    }

    const sub_categories = []

    for (let i = 1; i < 6; i++){
      const key = `subCategory${i}`;
      if (this.state.hasOwnProperty(key) && this.state[key]) {
        sub_categories.push({ sub_category_name: this.state[key] })
      }
    }

    if (sub_categories.length) {
      data.sub_categories = sub_categories
    }

    this.props.addCategory(data);
    this.props.reload();

    return this.setState({
      newCategory: '',
      subCategory1: '',
      subCategory2: '',
      subCategory3: '',
      subCategory4: '',
      subCategory5: ''
    })
  }

  render() {
    const isEnabled = this.state.newCategory.length > 2 && this.state.newCategory.length < 21;

    return (
      <form className="new-category-form">
        <div className="category-form-div">
          <label for="newCategory">Category Name</label>
          <br />
          <input
            name="newCategory"
            value={this.state.newCategory}
            placeholder="category name"
            onChange={this.handleCategoryInput}
            minlength="2"
            maxlength="20"
          />
        </div>

        <div className="category-form-div">
          <label for="subCategories">Add Up to 5 Subcategories (optional)</label>
          <br />
          <input
            name="subCategory1"
            value={this.state.subCategory1}
            placeholder="subcategory 1"
            onChange={this.handleSubcategoryInput}
            minlength="2"
            maxlength="20"
          />
          <input
            name="subCategory2"
            value={this.state.subCategory2}
            placeholder="subcategory 2"
            onChange={this.handleSubcategoryInput}
            minlength="2"
            maxlength="20"
          />
          <input
            name="subCategory3"
            value={this.state.subCategory3}
            placeholder="subcategory 3"
            onChange={this.handleSubcategoryInput}
            minlength="2"
            maxlength="20"
          />
          <input
            name="subCategory4"
            value={this.state.subCategory4}
            placeholder="subcategory 4"
            onChange={this.handleSubcategoryInput}
            minlength="2"
            maxlength="20"
          />
          <input
            name="subCategory5"
            value={this.state.subCategory5}
            placeholder="subcategory 5"
            onChange={this.handleSubcategoryInput}
            minlength="2"
            maxlength="20"
          />
        </div>

        <div className="submit-div">
          <button type="submit" disabled={!isEnabled} onClick={this.handleSubmit}>Submit</button>

        </div>

      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCategory: (data) => dispatch(addCategory(data)),
  };
};

AdminAddCategory = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminAddCategory);

export default AdminAddCategory;
