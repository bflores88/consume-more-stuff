import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotAuthorized extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="not-authorized">
        <h1>Not Authorized</h1>
        <p>You are not authorized to view this page.</p>
        <br></br>
        <br></br>
        <Link to="/">Back to All Products</Link>
      </div>
    )
  }
}

export default NotAuthorized;