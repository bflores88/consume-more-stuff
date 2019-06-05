import React, { Component } from 'react';

import './Footer.scss';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="footer">
        <div className="logoBox">
          <h4 className="title">
          <i class="fas fa-sun"></i>
            Savannah
          </h4>
        </div>
      </div>
    );
  }
}

export default Footer;
