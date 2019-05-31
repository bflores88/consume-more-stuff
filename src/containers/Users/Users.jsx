import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Users.scss';

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    // console.log(this.props.currentUser.id)
    const user = this.props.match.params.id;
    console.log(user);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const user = this.props.match.params.id;

      console.log(user);
    }
  }

  render() {
 
    if (!this.props.currentUser) {
      return <Redirect to="/" />;
    } else if (this.props.currentUser.role_id === 3 && this.props.match.params.id === "all") {
      return <Redirect to="/" />;
    } else {
      return <h1>Users Page</h1>;
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

Users = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users);

export default Users;
