import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions';
import { withRouter } from 'react-router';

class LoginButton extends Component {
  constructor(props) { // constructor only happens once.
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
      <button onClick={this.handleSubmit}>
        {this.props.text}
      </button>
    );
  }
}

const mapStateToProps = (state) => {
  if (state.authentication.loggedIn) {
    // console.log('6 - Login Button mapping state to props with user');
    return {
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

LoginButton = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginButton);

const LoginButtonWithRouter = withRouter(LoginButton);
export default LoginButtonWithRouter;