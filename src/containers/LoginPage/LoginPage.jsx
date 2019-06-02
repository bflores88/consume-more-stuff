import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions';
import './LoginPage.scss';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {

      error: null,

      data: {
        username: '',
        password: '',
      }
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(e) {
    const { value } = e.target;
    this.setState(prevState => ({ 
      data: {
        ...prevState.data,
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

  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.state.data).then((reducer) => {
      const reducerType = reducer.type;
      // console.log('Submit Event Reducer Type: ', reducerType);
      if (reducerType === 'LOGIN_SUCCESS') {
        this.props.history.push('/');
      } else {
        this.setState({ error : reducer.payload.error});
      }
    });
  }

  render() {
    return (
      <div className="login-page">
        <div className="login-form">
          <h1>Login </h1>

          <form>
            <ul>
              <li><label htmlFor="username">Your Username</label></li>
              <li><input 
                type="text" 
                onChange={this.handleUsernameChange} />
              </li>
              

              <li><label htmlFor="password">Password</label></li>
              <li><input 
                type="password" 
                onChange={this.handlePasswordChange} />
              </li>
            </ul>

            <button type="submit" onClick={this.handleSubmit}>
              Submit
            </button>
          </form>
          <h4>{this.state.error}</h4>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => {
      const loginAction = login(data);
      return dispatch(loginAction);
    }
  }
}

LoginPage = connect(
  null,
  mapDispatchToProps,
)(LoginPage);

export default LoginPage;