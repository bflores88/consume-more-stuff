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
      condiiton_id: 0,
      quantity: 0,
      description: '',
    };
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
  }

  handleInputOnChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    console.log(name, value);
    return this.setState({ [name]: value });
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
          <form action="">
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
                <input type="file" name="image" onChange={this.handleInputOnChange} />
              </div>
              <div className="input-div">
                <div className="category">
                  <label>Category: </label>
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
                  <label>Condition: </label>
                  <select
                    name="condition_id"
                    value={this.state.condiiton_id}
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
                <label htmlFor="quantity">Quantity</label>
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
                <label htmlFor="description">Description</label>
                <input
                  className="description-input"
                  type="textarea"
                  name="description"
                  placeholder="Description"
                  value={this.state.description}
                  onChange={this.handleInputOnChange}
                />
              </div>
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
