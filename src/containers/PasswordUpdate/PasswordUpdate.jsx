import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './PasswordUpdate.scss';

class PasswordUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="password-update">
        <h1>Update Your Password</h1>
      </div>
    )
  }
}

export default PasswordUpdate;