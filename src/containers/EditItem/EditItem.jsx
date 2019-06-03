import React, { Component } from 'react';
import { connect } from 'react-redux';
import './EditItem.scss';
// import { editItem } from '../../actions';
import { loadSpecificItem } from '../../actions';
import CategoryDropdown from '../CategoryDropdown';

// import editItemImage from '../editItemImage';

class EditItem extends Component {
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
      // image: this.props.item.images,
      // name: this.props.item.name,
      // dimensions: this.props.item.dimensions,
      // price: this.props.item.price,
      // inventory: this.props.item.inventory,
      // description: this.props.item.description,
      // // condition: this.props.item.conditions.conditionName,
      // status: this.props.item.active,
      // subcat: this.props.item.subCategories.subCategoryName,
      // updated: this.props.item.updated_at,
      // category: this.props.item.categories.categoryName,
      // seller: this.props.item.users.username,
      // sellerID: this.props.item.user_id,
      // showModal: false,
    };
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.editThisItem = this.editThisItem.bind(this);
  }
  // state = {
  //   name: this.props.item.name,
  // };
  handleInputOnChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    console.log(name, value);
    return this.setState({ [name]: value });
  }

  editThisItem(e) {
    e.preventDefault();
    const data = {};

    this.props.editItem(data);
    console.log(this.props.newestItem);
  }

  componentDidMount() {
    this.props.loadSpecificItem(this.props.match.params.id).then((data) => {
      if (!data) {
        return console.log('no data');
      } else {
        console.log(data);
        this.setState({ name: data.payload.name });
        this.setState({ price: data.payload.price });
        this.setState({ inventory: data.payload.inventory });
        this.setState({ category_id: data.payload.category_id });
        this.setState({ condition_id: data.payload.condition_id });
        this.setState({ dimensions: data.payload.dimensions });
        this.setState({ description: data.payload.description });
      }
    });
    // this.setState({ name: this.props.item.name });
  }

  componentDidUpdate(prevProps) {
    // if (this.props.match.params.id !== prevProps.match.params.id) {
    //   this.setState({ name: this.props.item.name });
    //   return this.props.loadSpecificItem(this.props.match.params.id);
    // }
    // this.setState({ name: this.props.item.name });
  }

  render() {
    if (this.state.name === '') {
      return <div>page loading</div>;
    } else {
      // console.log(this.props.item.name);

      return (
        <div className="add-item-page">
          <h1>
            Edit Item Page
            {/* {this.props.item} */}
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
                      value={parseInt(this.state.price)}
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
                    value={this.state.description}
                  />
                </div>
                <button onClick={this.addNewItem} className="submit-item-button">
                  Continue
                </button>
              </div>
            </form>
          </div>
          <CategoryDropdown />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    item: state.itemReducer.item,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSpecificItem: (item) => dispatch(loadSpecificItem(item)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditItem);
