import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import './SideBox.scss';

class SideBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="side-box">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/AddItem">Add Item</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default SideBox;
