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
    if (this.props.loggedIn) {
      return (
        <div className="header">
          <div className="logoBox">
            <Link to="/">
              <i className="sunLogo" className="fas fa-sun" /> {/*Independent for CSS*/}
              <h2 className="title">
                {/* <i className="sunLogo" className="fas fa-sun" /> */}
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
              <i className="sunLogo" className="fas fa-sun" /> {/*Independent for CSS*/}
              <h2 className="title">
                {/* <i className="sunLogo" className="fas fa-sun" /> */}
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
