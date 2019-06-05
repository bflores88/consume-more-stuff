import React, { Component } from 'react';
import './AdminAddCategory.scss';

class AdminAddCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newCategory: '',
    };

    this.handleCategoryInput = this.handleCategoryInput.bind(this);
    this.handleSubcategoryInput = this.handleSubcategoryInput.bind(this);
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

  render() {
    const isEnabled = this.state.newCategory.length > 3;

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
          />
        </div>

        <div className="category-form-div">
          <label for="subCategories">Add Up to 5 Subcategories (optional)</label>
          <br />
          <input
            name="subCategory1"
            value={this.state.value}
            placeholder="subcategory 1"
            onChange={this.handleSubcategoryInput}
          />
          <input
            name="subCategory2"
            value={this.state.value}
            placeholder="subcategory 2"
            onChange={this.handleSubcategoryInput}
          />
          <input
            name="subCategory3"
            value={this.state.value}
            placeholder="subcategory 3"
            onChange={this.handleSubcategoryInput}
          />
          <input
            name="subCategory4"
            value={this.state.value}
            placeholder="subcategory 4"
            onChange={this.handleSubcategoryInput}
          />
          <input
            name="subCategory5"
            value={this.state.value}
            placeholder="subcategory 5"
            onChange={this.handleSubcategoryInput}
          />
        </div>

        <div className="submit-div">
          <button type="submit" disabled={!isEnabled}>Submit</button>

        </div>

      </form>
    );
  }
}

export default AdminAddCategory;
