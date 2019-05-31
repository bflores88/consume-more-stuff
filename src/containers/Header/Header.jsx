import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import './Header.scss';

import LoginComponent from '../LoginComponent';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { name, id, price } = this.props;
    // console.log(this.props.id);
    let searchFont = <i className="fas fa-search" />;
    return (
      <div className="header">
        <div className="logoBox">
          <h2 className="title">
            <i className="sunLogo" className="fas fa-sun" />
            Savannah
          </h2>
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
        <LoginComponent />
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
