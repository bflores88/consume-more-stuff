import React, { Component } from 'react';
import './UserItems';
import InactiveItems from '../../components/InactiveItems';
import { connect } from 'react-redux';

class UserItems extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <div> User Items Page</div>
        <InactiveItems />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.itemReducer.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

UserItems = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserItems);

export default UserItems;
