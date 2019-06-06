import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.scss';
import SearchBar from '../SearchBar';
import LoginLogoutButton from '../LoginLogoutButton';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <div className="header">
          <div className="logoBox">
            <Link to="/">
              <i className="sunLogo" className="fas fa-sun" /> 
              <h2 className="title">Savannah</h2>
            </Link>
          </div>
        <SearchBar/>
        <div className="login-box">
          <div className="inner-login-box">
            <LoginLogoutButton />
              <div className="shopping-cart-icon">
                <Link to="/cart">
                  <i className="fas fa-shopping-cart" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="header">
          <div className="logoBox">
            <Link to="/">
              <i className="sunLogo" className="fas fa-sun" /> 
              <h2 className="title">
                Savannah
              </h2>
            </Link>
          </div>
          <SearchBar/>
          <div className="login-box">
            <LoginLogoutButton />
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.userReducer.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
