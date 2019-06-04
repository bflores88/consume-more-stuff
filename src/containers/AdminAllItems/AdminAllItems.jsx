import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AdminAllItems.scss';

class AdminAllItems extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return ( <h1>All Items</h1>)
  }
}



export default AdminAllItems;