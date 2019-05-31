import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    return (
      <>
      <h1>Users Page</h1>
        <p>Page for All or Single Users</p>
        </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.itemReducer.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};

};

Users = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users)



export default Users;