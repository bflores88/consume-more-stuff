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

  componentDidMount() {
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
    console.log('is user on own page?', isUserOnOwnPage);
    console.log('this user', thisUser);
    console.log('params page', userPage);

    if (isUserOnOwnPage) {
      return (
        <>
          <div className="user-items">
            <ActiveItems id={parseInt(this.props.match.params.id)} isUserOnOwnPage={isUserOnOwnPage} />
            <br></br><br></br>
          <InactiveItems id={parseInt(this.props.match.params.id)} />
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="user-items">
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
