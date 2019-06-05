import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AdminAllItems.scss';
import { loadItems } from '../../actions';
import AdminItemCard from '../../components/AdminItemCard'

class AdminAllItems extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <>
        <h1>All Items</h1>
        <AdminItemCard />
      </>
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

AdminAllItems = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminAllItems);


export default AdminAllItems;