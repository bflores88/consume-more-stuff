import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/index';
import './Registration.scss';

class Registration extends Component {
  constructor(props){
    super(props);

    this.state = {
      minUsernameLength: 3,
      maxUsernameLength: 20,
      minPasswordLength: 6,
      maxPasswordLength: 100,

      usernameErrorMessage: '',
      usernameErrorRender: { display: 'none' },

      data: {
        username: '',
        password: '',
        name: '',
        email: '',
        profileImage: 'https://images.unsplash.com/photo-1458682625221-3a45f8a844c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
      },
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleProfileImageChange = this.handleProfileImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(e) {
    const { value } = e.target;
    // updater function form
    this.setState(prevState => ({ // Asynchronous, so logging state and value will not show the same data.
      data: {
        ...prevState.data, // add the previous state of data's attributes to the new data state.
        username: value,
      }
    }));
  }

  handlePasswordChange(e) {
    const { value } = e.target;
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        password : value,
      }
    }));
  }

  handleNameChange(e) {
    const { value } = e.target;
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        name : value,
      }
    }));
  }

  handleEmailChange(e) {
    const { value } = e.target;
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        email : value,
      }
    }));
  }

  handleProfileImageChange(e) {
    const { value } = e.target;
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        profileImage : value,
      }
    }));
  }

  handleSubmit(e) { 
    e.preventDefault();
    this.props.register(this.state.data).then((body) => {
      const response = body.payload; // body.payload is the parameter given to res.json() in auth.js
      if (response.username){
        return this.props.history.push('/');
      } else {
        this.setState({
          usernameErrorMessage : response.usernameErrorMessage,
          usernameErrorRender : { display: 'initial'},
        });
      }
    });
  }

  render(){
    /* handleSubmit() not called if required, minLength, 
    and maxLength conditions are not met when clicking submit button. */
    return(
      <div className="registration-page">
        <div className="registration-form">
          <h1>Create Account</h1>

          <form onSubmit={this.handleSubmit}> 
            <ul>
              <li><label htmlFor="username">Your Username </label></li>
              <li style={this.state.usernameErrorRender}>
                <p className="error">{this.state.usernameErrorMessage}</p>
              </li>
              <li>
                <input 
                  type="text"
                  name="username"
                  required
                  minLength={this.state.minUsernameLength}  
                  maxLength={this.state.maxUsernameLength} 
                  onChange={this.handleUsernameChange}
                />
              </li>
              

              <li><label htmlFor="password">Password </label></li>
              <li>
                <input 
                  type="password"
                  name="password"
                  required
                  minLength={this.state.minPasswordLength}
                  maxLength={this.state.maxPasswordLength}
                  onChange={this.handlePasswordChange}
                /> 
              </li>


              <li><label htmlFor="name">Name </label></li>
              <li>
                <input 
                  type="text"
                  name="name"
                  onChange={this.handleNameChange}
                />
              </li>


              <li><label htmlFor="email">Email </label></li>
              <li>
                <input 
                  type="email"
                  name="email"
                  onChange={this.handleEmailChange}
                />
              </li>


              <li><label htmlFor="profileImage">Profile Image URL: </label></li>
              <li>
                <input 
                  type="url"
                  name="profileImage"
                  onChange={this.handleProfileImageChange}
                />
              </li>
            </ul>

            <button type="submit">Create your Savannah Account</button>

            <div className="registration-directions">
              <h6>Information: </h6>
              <ul>
                <li>Password must be at least 6 characters.</li>
                <li>Already have an account? Click the login button at the upper-right corner.</li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    registrationSuccessful : state.userReducer.registrationSuccessful
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (accountData) => {
      const registerAction = register(accountData);
      return dispatch(registerAction);
    }
  }
}

Registration = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);

export default Registration;