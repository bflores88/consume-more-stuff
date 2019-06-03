import React, { Component } from 'react';
import './UserItems.scss';
import InactiveItems from '../../components/InactiveItems';
import ActiveItems from '../../components/ActiveItems';
import { connect } from 'react-redux';

class UserItems extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const thisUser = this.props.currentUser.id;
    const userPage = parseInt(this.props.match.params.id);
    console.log('this user', thisUser);
    console.log('params page', userPage);

    return (
      <>
        <div className="user-items">
          <ActiveItems id={parseInt(this.props.match.params.id)} />
          <br></br><br></br>
        <InactiveItems id={parseInt(this.props.match.params.id)} />
        </div>
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
