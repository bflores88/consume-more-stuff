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
    // console.log('loginComponent.handleSubmit()');
    this.props.login({ username, password })
  }

  render(){ 
    if (this.props.enabled) {
      return (
      <div className="login-component">
        <form>
          <div>
            <label>Username: </label>
            <input type="text" placeholder="username" onChange={this.handleUsernameChange}/>
          </div>
          <div>
            <label>Password: </label>
            <input type="text" placeholder="password" onChange={this.handlePasswordChange}/>
          </div>
          <button type="submit" onClick={this.handleSubmit}>Submit</button>
        </form>
      </div> );
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
      // console.log('credentials ', credentials);
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