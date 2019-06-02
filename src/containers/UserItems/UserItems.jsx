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
    console.log(this.props.match.params.id)
    return (
      <>
        <div> User Items Page</div>
        <InactiveItems id={parseInt(this.props.match.params.id)} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.authentication.user,
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
