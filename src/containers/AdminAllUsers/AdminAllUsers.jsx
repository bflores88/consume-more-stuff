import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AdminAllUsers.scss';

class AdminAllUsers extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return ( <h1>All Users</h1>)
  }
}



export default AdminAllUsers;