import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.scss';

import LoginComponent from '../LoginComponent';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="header">
        <div className="logoBox">
          <h2 className="title">
            <i className="sunLogo" class="fas fa-sun" />
            Savannah
          </h2>
        </div>

        <div className="searchBarBox">
          <form action="">
            {/* <label htmlFor="search">Search</label> */}
            <input name="search" type="text" placeholder="Search" />

            <button>
              <i class="fas fa-search" />
            </button>
          </form>
        </div>
        <LoginComponent/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
