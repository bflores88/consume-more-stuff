import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Users.scss';
import { loadSingleUser } from '../../actions';

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const user = this.props.match.params.id;
    this.props.loadSingleUser(user);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const user = this.props.match.params.id;
      this.props.loadSingleUser(user);
    }
  }

  render() {
    console.log(this.props.user)
    if (!this.props.currentUser) {
      return <Redirect to="/" />;
    } else if (this.props.currentUser.role_id === 3 && this.props.match.params.id === "all") {
      return <Redirect to="/" />;
    } else if (this.props.match.params.id !== "all") {
      return <h1>Single Users Page</h1>
    }else {
      return <h1>Users Page</h1>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.itemReducer.currentUser,
    user: state.itemReducer.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSingleUser: (user) => dispatch(loadSingleUser(user)),
  };
};

Users = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users);

export default Users;
