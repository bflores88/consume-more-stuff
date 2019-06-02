import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class LoginButton extends Component {
  constructor(props) { // constructor only happens once.
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.history.push(this.props.destination);
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
  // console.log('5 - Global State: ', state);
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

LoginButton = connect(
  mapStateToProps,
  null,
)(LoginButton);

const LoginButtonWithRouter = withRouter(LoginButton);
export default LoginButtonWithRouter;