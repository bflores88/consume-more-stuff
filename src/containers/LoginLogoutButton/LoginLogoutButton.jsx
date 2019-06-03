import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions';
import { setExistingUser } from '../../actions';
import { withRouter } from 'react-router';
import './LoginLogoutButton.scss';

class LoginLogoutButton extends Component {
  constructor(props) { 
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount(){
    if (localStorage.getItem('user')){
      const storedUser = JSON.parse(localStorage.getItem('user'));
      this.props.setExistingUser(storedUser);
    }
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
  if (state.userReducer.loggedIn) {
    return {
      welcomeMessage: 'Welcome back ' + state.userReducer.user.name,
      text: 'Logout',
      destination: '/logout',
    }
  } else {
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
    },
    setExistingUser: (data) => {
      const setExistingUserAction = setExistingUser(data); 
      return dispatch(setExistingUserAction);
    },
  }
}

LoginLogoutButton = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginLogoutButton);

const LoginLogoutButtonWithRouter = withRouter(LoginLogoutButton);
export default LoginLogoutButtonWithRouter;