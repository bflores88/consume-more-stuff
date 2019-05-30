import React, { Component } from 'react';
import LoginComponent from '../Login';
import { logout } from '../../actions';
import { connect } from 'react-redux';

class LoginButton extends Component {
  constructor (props) {
    super(props);

    this.state = {
      renderLoginForm: false,
    }

    this.handleLoginFormEnable = this.handleLoginFormEnable.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLoginFormEnable(e){
    e.preventDefault();
    this.setState({renderLoginForm : !this.state.renderLoginForm});
    console.log(this.state.renderLoginForm);
  }

  handleLogout(e){
    e.preventDefault();
    const user = localStorage.getItem('user');
    if (user){
      this.props.logout(user);
    }
  }

  render() {
    return(
      <div className="login-button">
        <button onClick={this.handleLoginFormEnable}>Login</button>
        <LoginComponent enabled={this.state.renderLoginForm}/>
        <button onClick={this.handleLogout}>Logout</button>
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