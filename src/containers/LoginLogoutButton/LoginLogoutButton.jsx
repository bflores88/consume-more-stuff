import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions';
import { withRouter } from 'react-router';
import './LoginLogoutButton.scss';

class LoginLogoutButton extends Component {
  constructor(props) { 
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.destination === '/login') {
      this.props.history.push(this.props.destination);
    } else {
      this.props.logout();
    }
  }

  render() {
    return(
      <div className="login-logout-button">
        <p>{this.props.welcomeMessage}</p>
        <button onClick={this.handleSubmit}> {this.props.text} </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  if (state.userReducer.loggedIn) {
    // console.log('6 - Login Button mapping state to props with user');
    return {
      welcomeMessage: 'Welcome back ' + state.userReducer.user.name,
      text: 'Logout',
      destination: '/logout',
    }
  } else {
    // console.log('6 - Login Button mapping state to props with no user');
    return {
      text: 'Login',
      destination: '/login',
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      const logoutAction = logout();
      return dispatch(logoutAction);
    }
  }
}

LoginLogoutButton = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginLogoutButton);

const LoginLogoutButtonWithRouter = withRouter(LoginLogoutButton);
export default LoginLogoutButtonWithRouter;