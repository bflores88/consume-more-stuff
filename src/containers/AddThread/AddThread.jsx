import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AddThread.scss';
import { addItem } from '../../actions';

import AddItemImage from '../AddItemImage';

class AddThread extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
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
  }
  componentDidMount() {
    // return console.log('94it93it349ti3', this.props.newestItem);
  }

  render() {
    return (
      <div className="add-thread-page">
        <h1>Add Thread Page</h1>
        <div className="add-thread-form-box">
          <form className="add-thread-form" action="">
            <div />
            <div className="input-div">
              <label className="input-label" htmlFor="name">
                Thread Subject:
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
)(AddThread);
