import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions';

class LoginForm extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      username: '',
      password: '',
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(e){
    const {value} = e.target;
    this.setState({username : value});
  }

  handlePasswordChange(e){
    const {value} = e.target;
    this.setState({password : value});
  }

  handleSubmit(e){
    e.preventDefault();
    const {username, password} = this.state;
    this.props.login({ username, password })
  }

  render(){ 
    if (this.props.renderLoginForm) {
      return (
        <form>
          <input type="text" placeholder="username" onChange={this.handleUsernameChange}/>
          <input type="text" placeholder="password" onChange={this.handlePasswordChange}/>
          <button type="submit" onClick={this.handleSubmit}>Submit</button>
        </form>
      );
    } else {
      return (
        <div className="login-component"></div>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      const loginAction = login(credentials);
      dispatch(loginAction);
    }
  }
}

LoginForm = connect(
  null,
  mapDispatchToProps
)(LoginForm);

export default LoginForm;