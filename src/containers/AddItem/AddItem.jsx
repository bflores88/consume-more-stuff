import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AddItem.scss';

class AddItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      price: 0,
      category_id: 0,
      condition_id: 0,
      quantity: 0,
      description: '',
      dimensions: '',
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
    data.quantity = this.state.quantity;
    data.description = this.state.description;
    data.user_id = this.props.currentUser.id;
    data.approved = false;
    data.viewCount = 0;
    data.status_id = 1;

    console.log(data);
  }
  componentDidMount() {
    return console.log('94it93it349ti3', this.props.currentUser);
  }

  render() {
    return (
      <div className="add-item-page">
        <h1>
          Add Item Page
          <div>User:{this.props.currentUser.username}</div>
        </h1>
        <div className="add-item-form-box">
          <form className="add-item-form" action="">
            <div className="top-box">
              <div className="title-price-container">
                <div className="input-div">
                  <label htmlFor="name">Item Name</label>
                  <input
                    className="name-input"
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.handleInputOnChange}
                    required
                  />
                </div>

                <div className="input-div">
                  <label htmlFor="price">Price</label>
                  <input
                    className="price-input"
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={this.state.price}
                    onChange={this.handleInputOnChange}
                  />
                </div>
              </div>
              <div className="image">
                <label htmlFor="image">Add an Image</label>
                <input className="input-label" type="file" name="image" onChange={this.handleInputOnChange} />
              </div>
              <div className="input-div">
                <div className="category">
                  <label className="input-label">Category: </label>
                  <select
                    name="category_id"
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
                <label className="input-label" htmlFor="quantity">
                  Quantity
                </label>
                <input
                  className="quantity-input"
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={this.state.quantity}
                  onChange={this.handleInputOnChange}
                />
              </div>
              <div className="input-div">
                <label htmlFor="dimensions">Item Name</label>
                <input
                  className="dimensions-input"
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
                  Description
                </label>

                <textarea
                  onChange={this.handleInputOnChange}
                  className="description-input"
                  name="description"
                  id=""
                  cols="30"
                  rows="10"
                />
              </div>
              <button onClick={this.addNewItem} className="submit-item-button">
                Submit Item
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    images: state.itemReducer.images,
    currentUser: state.itemReducer.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddItem);
