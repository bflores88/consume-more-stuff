import React, { Component } from 'react';
import './UserItems.scss';
import InactiveItems from '../../components/InactiveItems';
import ActiveItems from '../../components/ActiveItems';
import { connect } from 'react-redux';
import { grabUsername } from '../../actions';

class UserItems extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.grabUsername(this.props.match.params.id);
    if (this.props.currentUser) {
      const thisUser = this.props.currentUser.id;
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentUser !== prevProps.currentUser) {
      const thisUser = this.props.currentUser.id;
    }
  }

  render() {
    const thisUser = this.props.currentUser.id;
    const userPage = parseInt(this.props.match.params.id);
    const isUserOnOwnPage = thisUser === userPage;
    const username = this.props.username.username;

    if (isUserOnOwnPage) {
      return (
        <>
          <div className="user-items">
            <div className="user-store">
              <h1>{username}'s Store</h1>
            </div>
            <ActiveItems
              id={parseInt(this.props.match.params.id)}
              isUserOnOwnPage={isUserOnOwnPage}
              username={this.props.username.username}
            />
            <br />
            <br />
            <InactiveItems id={parseInt(this.props.match.params.id)} />
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="user-items">
            <div className="user-store">
              <h1>{username}'s Store</h1>
            </div>
            <ActiveItems id={parseInt(this.props.match.params.id)} isUserOnOwnPage={isUserOnOwnPage} />
          </div>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.itemReducer.currentUser,
    username: state.itemReducer.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    grabUsername: (userID) => dispatch(grabUsername(userID)),
  };
};

UserItems = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserItems);

export default UserItems;
