import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../actions/index';

class Registration extends Component {
  constructor(props){
    super(props);

    this.state = {
      minUsernameLength: 3,
      maxUsernameLength: 20,
      minPasswordLength: 6,
      maxPasswordLength: 100,

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
    if (!this.props.registrationSuccessful){
        return;
      } else {
        this.props.register(this.state.data);
        return this.props.history.push('/')
      }
  }

  render(){
    return(
      <div className="registration-form">
        {/* handleSubmit() not called if required, minLength, 
        and maxLength conditions are not met when clicking submit button. */}
        <form onSubmit={this.handleSubmit}> 
          <div>
            <label htmlFor="username">Username: </label>
            <input 
              type="text"
              name="username"
              required
              minLength={this.state.minUsernameLength}  
              maxLength={this.state.maxUsernameLength} 
              onChange={this.handleUsernameChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input 
              type="password"
              name="password"
              required
              minLength={this.state.minPasswordLength}
              maxLength={this.state.maxPasswordLength}
              onChange={this.handlePasswordChange}
            /> 
          </div>
          <div>
            <label htmlFor="name">Name: </label>
            <input 
              type="text"
              name="name"
              onChange={this.handleNameChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input 
              type="email"
              name="email"
              onChange={this.handleEmailChange}
            />
          </div>
          <div>
            <label htmlFor="profileImage">Profile Image URL: </label>
            <input 
              type="url"
              name="profileImage"
              onChange={this.handleProfileImageChange}
            />
          </div>
          <div>
            <input type="submit" name="submit"/>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('mapping state to props for registration');
  console.log('state ', state);
  return {
    registrationSuccessful : state.registerReducer.registrationSuccessful
  }
}
// function mapToPropsForPage(pageType, mapToProps)

const mapDispatchToProps = (dispatch) => {
  return {
    register: (accountData) => {
      const registerAction = register(accountData);
      dispatch(registerAction);
    }
  }
}

Registration = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);

export default Registration;