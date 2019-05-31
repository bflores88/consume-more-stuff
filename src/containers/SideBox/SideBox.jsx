import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import './SideBox.scss';
import Sidebar from '../../components/Sidebar/Sidebar';

class SideBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="side-box">
        <Sidebar />
      </div>
    );
  }
}

export default SideBox;
