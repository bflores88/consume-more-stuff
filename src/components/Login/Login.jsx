import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions';

class LoginComponent extends Component {
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
    this.props.login({username, password})
    .then((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    });
  }

  render() {
    <div className="login-component">
      <form>
        <div>
          <label>Username: </label>
          <input type="text" placeholder="username"/>
        </div>
        <div>
          <label>Password: </label>
          <input type="text" placeholder="password"/>
        </div>
      </form>
    </div>
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      console.log('credentials ', credentials);
      const loginAction = login(credentials);
      dispatch(loginAction);
    }
  }
}

Login = connect(
  null,
  mapDispatchToProps
)(Login);

export default LoginComponent;