import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.scss';
import LoginLogoutButton from '../LoginLogoutButton';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="header">
        <div className="logoBox">
          <Link to="/">
            <h2 className="title">
            <i class="fas fa-sun"></i>
              Savannah
            </h2>
          </Link>
        </div>

        <div className="searchBarBox">
          <form action="">
            {/* <label htmlFor="search">Search</label> */}
            <input name="search" type="text" placeholder="Search" />

            <button>
              <i className="fas fa-search" />
            </button>
          </form>
        </div>

        <div className="login-box">
          <LoginLogoutButton/>
        </div>
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
