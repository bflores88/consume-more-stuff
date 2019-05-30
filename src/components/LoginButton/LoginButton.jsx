import React, { Component } from 'react';
import LoginComponent from '../Login';
import { logout, login } from '../../actions';
import { connect } from 'react-redux';

class LoginButton extends Component {
  constructor (props) {
    super(props);

    this.state = {
      renderLoginForm: false,
      renderLoginButton: true,
      renderLoginCancelButton : false,
      renderLogoutButton: false,
    }

    this.handleLoginFormEnable = this.handleLoginFormEnable.bind(this);
    this.handleLoginRequest = this.handleLoginRequest.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLoginFormEnable(e){
    e.preventDefault();
    this.setState({renderLoginForm : !this.state.renderLoginForm});
    this.setState({renderLoginButton : !this.state.renderLoginButton});
    this.setState({renderLoginCancelButton : !this.state.renderLoginCancelButton});
    this.setState({renderLogoutButton : !this.state.renderLogoutButton});
  }

  handleLogout(e){
    e.preventDefault();
    const user = localStorage.getItem('user');
    if (user){
      this.props.logout(user);
    }
  }

  handleLoginRequest(e){
    e.preventDefault();
    
  }

  render() {
    let loginButtonDisplay = {
      display: 'initial'
    };
    let loginCancelButtonDisplay = {
      display: 'initial'
    }
    let logoutButtonDisplay = {
      display: 'none'
    }

    if (!this.state.renderLoginButton) {
      loginButtonDisplay.display = 'none';
    }
    if (!this.state.renderLoginCancelButton) {
      loginCancelButtonDisplay.display = 'none';
    }
    if (!this.state.renderLogoutButton) {
      logoutButtonDisplay.display = 'initial';
    }

    return(
      <div className="login-box">
        <button style={loginButtonDisplay} onClick={this.handleLoginFormEnable}>Login</button>
        <LoginComponent enabled={this.state.renderLoginForm}/>
        <button style={loginCancelButtonDisplay} onClick={this.handleLoginFormEnable}>Cancel</button>
        <button style={logoutButtonDisplay} onClick={this.handleLogout}>Logout</button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      // console.log('credentials ', credentials);
      const logoutAction = logout();
      dispatch(logoutAction);
    }
  }
}

LoginButton = connect(
  null,
  mapDispatchToProps
)(LoginButton);

export default LoginButton;