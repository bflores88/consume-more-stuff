import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CategoryDropdown.scss';
import { addItem } from '../../actions';
import { resetNewItem } from '../../actions';
import { loadCategories } from '../../actions';
import { updateChosenCategory } from '../../actions';
import SubCategoryDropdown from '../SubCategoryDropdown';

class CategoryDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category_dropdown_id: '',
      subcategory_dropdown_id: '',
      subcategories: [],
    };
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.changeSubCategories = this.changeSubCategories.bind(this);
  }

  handleInputOnChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ category_dropdown_id: value });

    return this.props.updateChosenCategory(value);
  }

  changeSubCategories(e) {}

  componentDidMount() {
    this.props.loadCategories();
  }

  render() {
    const categoryOptions = this.props.categories.map((category, idx) => {
      return <option value={category.id}>{category.categoryName}</option>;
    });

    return (
      <div>
        <select
          name="category_dropdown_id"
          className="select"
          value={this.state.category_dropdown_id}
          onChange={this.handleInputOnChange}
          // onChange={this.changeSubCategories}
          required
        >
          <option value="">Choose a Category</option>

          {categoryOptions}
        </select>
        <SubCategoryDropdown category_id={this.state.category_dropdown_id} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    images: state.itemReducer.images,
    currentUser: state.itemReducer.currentUser,
    newestItem: state.itemReducer.newestItem,
    categories: state.itemReducer.categories,
    chosen_category: state.itemReducer.chosen_category,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (item) => {
      dispatch(addItem(item));
    },
    resetNewItem: (item) => {
      dispatch(resetNewItem(item));
    },
    loadCategories: () => {
      dispatch(loadCategories());
    },
    updateChosenCategory: (id) => {
      dispatch(updateChosenCategory(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryDropdown);
