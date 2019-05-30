import React, { Component } from 'react';

import _register from '../../actions/index';

class Register extends Component {
  constructor(props){
    super(props);

    this.state = {
      minUsernameLength: 3,
      maxUsernameLength: 20,
      minPasswordLength: 6,
      maxPasswordLength: 100,
      username: '',
      password: '',
      name: '',
      email: '',
      profileImage: '',
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  handleUsernameChange(e) {
    const { value } = e.target;
    this.setState({username : value});
  }

  handlePasswordChange(e) {
    const { value } = e.target;
    this.setState({password : value});
  }

  handleNameChange(e) {
    const { value } = e.target;
    this.setState({name : value});
  }

  handleEmailChange(e) {
    const { value } = e.target;
    this.setState({email : value})
  }

  handleProfileImageChange(e) {
    const { value } = e.target;
    this.setState({profileImage : value});
  }

  handleSubmit() { // Handle Validate?
    if (this.state.username.length < minUsernameLength) {
      // error, name is too short or not entered.
    } 
    if (this.state.password.length < minPasswordLength) {
      // error, password is too short or not entered.
    }
  }

  render(){
    return(
      <div className="register">
        <form>
          <div>
            <label for="username">Username: </label>
            <input 
              type="text"
              name="username" // identifies input in data submitted with form data
              required // must have content before form can be submitted
              minLength={this.state.minUsernameLength.toString()} // is toString needed?  
              maxLength={this.state.maxUsernameLength.toString()} // is toString needed?
              onChange={this.handleUsernameChange}
            />
          </div>
          <div>
            <label>Password: </label>
            <input type="password"></input> 
          </div>
          
          <label>Name: </label>
          <input type="text"></input>
          <label>Email: </label>
          <input type="email"></input>
          <label>Profile Image: </label>
          <input type="url"></input>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default Register;