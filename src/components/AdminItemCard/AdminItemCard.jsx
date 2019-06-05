import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AdminItemCard.scss';

class AdminItemCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: 0,
      
    }
  }

  render() {
    return (
      <h1>Admin Item Card</h1>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // updatedUser: state.userReducer.updatedUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // adminUserEdit: (data) => dispatch(adminUserEdit(data)),
  };
};

AdminItemCard = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminItemCard);

export default AdminItemCard;