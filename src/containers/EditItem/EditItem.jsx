import React, { Component } from 'react';
import { connect } from 'react-redux';
import './EditItem.scss';
import { editItem } from '../../actions';
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
      active: false,
      id: 0,
    };
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.editThisItem = this.editThisItem.bind(this);
    this.handleActiveChange = this.handleActiveChange.bind(this);
  }
  // state = {
  //   name: this.props.item.name,
  // };
  handleInputOnChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    // console.log
    console.log(name, value);
    return this.setState({ [name]: value });
  }

  handleActiveChange(e) {
    if (this.state.active === false) {
      this.setState({ active: true });
      console.log(this.state.active);
    } else {
      this.setState({ active: false });
      console.log(this.state.active);
    }
  }

  editThisItem(e) {
    e.preventDefault();
    const data = {};
    data.category_id = this.props.chosen_category;
    data.sub_category_id = this.props.chosen_subcategory;
    data.name = this.state.name;
    data.price = this.state.price;
    data.inventory = this.state.inventory;
    data.dimensions = this.state.dimensions;
    data.condition_id = this.state.condition_id;
    data.active = this.state.active;
    data.approved = true;
    // data

    this.props.editItem(this.state.id, data);
    console.log(data);
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
        this.setState({ id: data.payload.id });
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

                    <CategoryDropdown />
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
                <div className="input-div">
                  <label htmlFor="active">Set item to Active?</label>
                  <label class="switch">
                    <input name="active" type="checkbox" onChange={this.handleActiveChange} />
                    <span class="slider" />
                  </label>
                </div>

                <button onClick={this.editThisItem} className="submit-item-button">
                  Edit Item
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    item: state.itemReducer.item,
    chosen_category: state.itemReducer.chosen_category,
    chosen_subcategory: state.itemReducer.chosen_subcategory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSpecificItem: (item) => dispatch(loadSpecificItem(item)),
    editItem: (id, item) => {
      dispatch(editItem(id, item));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditItem);
