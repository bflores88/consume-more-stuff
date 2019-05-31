import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AddItem.scss';

class AddItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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
            <label htmlFor="name">Item Name</label>
            <input type="text" name="name" />
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
