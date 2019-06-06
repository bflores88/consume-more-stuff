import React, { Component } from 'react';
import './AdminAddSubcategory.scss';
import { connect } from 'react-redux';
import { addSubcategory } from '../../actions';

class AdminAddSubcategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category_id: 0,
      subCategory1: ''
    };
    
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleSubcategoryInput = this.handleSubcategoryInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputOnChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    return this.setState({ [name]: value });
  
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

    const data = {}

    const sub_categories = []

    for (let i = 1; i < 6; i++){
      const key = `subCategory${i}`;
      if (this.state.hasOwnProperty(key) && this.state[key]) {
        sub_categories.push({ sub_category_name: this.state[key], category_id: this.state.category_id })
      }
    }

    if (sub_categories.length) {
      data.sub_categories = sub_categories
    }

    this.props.addSubcategory(data);
    this.props.reload();

    return this.setState({
      category_id: 0,
      subCategory1: '',
      subCategory2: '',
      subCategory3: '',
      subCategory4: '',
      subCategory5: ''
    })
  }

  generateCategorySelect(categories) {
    const categoryOptions = categories.map((category) => {
      return (
        <option className="select-selected" value={category.id}>
          {category.category_name}
        </option>
      );
    });

    return (
      <>
        
        <select name="category_id" className="custom-select" onChange={this.handleInputOnChange}>
        <option>
          Select Category
        </option>
          {categoryOptions}
        </select>
      </>
    );
  }

  render() {
    const generatedOptions = this.generateCategorySelect(this.props.categories);
    const isEnabled = this.state.category_id > 0 && this.state.subCategory1.length > 0;

    return (
      <div className="custom-select">
        <form className="subcategory-form">
          {generatedOptions}

          <div className="category-form-div">
          <label for="subCategories">Add Up to 5 Subcategories</label>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSubcategory: (data) => dispatch(addSubcategory(data)),
  };
};

AdminAddSubcategory = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminAddSubcategory);

export default AdminAddSubcategory;
