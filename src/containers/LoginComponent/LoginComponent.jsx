import React, { Component } from 'react';
import LoginForm from '../LoginForm';
import { logout } from '../../actions';
import { connect } from 'react-redux';

class LoginComponent extends Component {
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
        {/* renderLoginForm attribute in LoginForm component adds a prop of the same name whose value
        is the value of this.state.renderLoginForm. */}
        <LoginForm renderLoginForm={this.state.renderLoginForm}/>
        <button style={loginCancelButtonDisplay} onClick={this.handleLoginFormEnable}>Cancel</button>
        <button style={logoutButtonDisplay} onClick={this.handleLogout}>Logout</button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      const logoutAction = logout();
      dispatch(logoutAction);
    }
  }
}

LoginComponent = connect(
  null,
  mapDispatchToProps
)(LoginComponent);

export default LoginComponent;