import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AddItem.scss';
import { addItem } from '../../actions';

import AddItemImage from '../AddItemImage';

class AddItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      price: 0,
      category_id: 0,
      condition_id: 0,
      inventory: 0,
      description: '',
      dimensions: '',
      image: '',
      showModal: false,
    };
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
  }

  handleInputOnChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    // console.log(name, value);
    return this.setState({ [name]: value });
  }

  addNewItem(e) {
    e.preventDefault();
    const data = {};
    data.name = this.state.name;
    data.price = this.state.price;
    data.category_id = this.state.category_id;
    data.condition_id = this.state.condition_id;
    data.inventory = this.state.inventory;
    data.description = this.state.description;
    data.user_id = this.props.currentUser.id;
    data.subCategory_id = 1;
    data.dimensions = this.state.dimensions;
    data.approved = false;
    data.viewCount = 0;
    data.active = true;
    console.log(data);
    // const postEm = (inputData) =>{
    //   return () =>{
    //     return this.props.addItem(inputData)
    //   }
    // }
    this.props.addItem(data);
    console.log(this.props.newestItem);
  }
  componentDidMount() {
    return console.log('94it93it349ti3', this.props.newestItem);
  }

  render() {
    if (1 === 1) {
      return (
        <div className="add-item-page">
          <h1>
            Add Item Page
            {/* <div>User:{this.props.currentUser.username}</div>
            <div>newestItem:{this.props.newestItem.id}</div> */}
          </h1>
          <div className="add-item-form-box">
            <form className="add-item-form" action="">
              <div className="top-box">
                <div className="title-price-container">
                  <div className="input-div">
                    <label className="input-label" htmlFor="name">
                      Item Name:
                    </label>
                    <input
                      className="name-input"
                      className="input"
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={this.state.name}
                      onChange={this.handleInputOnChange}
                      required
                    />
                  </div>

                  <div className="input-div">
                    <label className="input-label" htmlFor="price">
                      Price
                    </label>
                    <input
                      className="price-input"
                      className="input"
                      type="number"
                      name="price"
                      placeholder="Price"
                      value={this.state.price}
                      onChange={this.handleInputOnChange}
                    />
                  </div>
                </div>

                <div className="input-div">
                  <div className="category">
                    <label className="input-label">Category: </label>
                    <select
                      name="category_id"
                      className="select"
                      value={this.state.category_id}
                      onChange={this.handleInputOnChange}
                      required
                    >
                      <option value="">Choose a Category</option>
                      <option value="1">Electronics</option>
                      <option value="2">Apparel</option>
                      <option value="3">Books</option>
                    </select>
                  </div>
                </div>
                <div className="input-div">
                  <div className="condition">
                    <label className="input-label">Condition: </label>
                    <select
                      name="condition_id"
                      className="select"
                      value={this.state.condition_id}
                      onChange={this.handleInputOnChange}
                      required
                    >
                      <option value="">Choose a Category</option>
                      <option value="1">New</option>
                      <option value="2">Good</option>
                      <option value="3">Fair</option>
                      <option value="4">Worn</option>
                      <option value="5">Used</option>
                    </select>
                  </div>
                </div>
                <div className="input-div">
                  <label className="input-label" htmlFor="inventory">
                    Inventory:
                  </label>
                  <input
                    className="inventory-input"
                    className="input"
                    type="number"
                    name="inventory"
                    placeholder="Inventory"
                    value={this.state.inventory}
                    onChange={this.handleInputOnChange}
                  />
                </div>
                <div className="input-div">
                  <label className="input-label" htmlFor="dimensions">
                    Item Name:
                  </label>
                  <input
                    className="dimensions-input"
                    className="input"
                    type="text"
                    name="dimensions"
                    placeholder="Dimensions"
                    value={this.state.dimensions}
                    onChange={this.handleInputOnChange}
                    required
                  />
                </div>
                <div className="input-div">
                  <label className="input-label" htmlFor="description">
                    Description:
                  </label>

                  <textarea
                    onChange={this.handleInputOnChange}
                    className="description-input"
                    name="description"
                    id=""
                    cols="30"
                    rows="10"
                    required
                  />
                </div>
                <button onClick={this.addNewItem} className="submit-item-button">
                  Continue
                </button>
              </div>
            </form>
          </div>
          <AddItemImage />
        </div>
      );
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    images: state.itemReducer.images,
    currentUser: state.authentication.user,
    newestItem: state.itemReducer.newestItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (item) => {
      dispatch(addItem(item));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddItem);
