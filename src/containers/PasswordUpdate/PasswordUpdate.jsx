import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './PasswordUpdate.scss';
import { connect } from 'react-redux';
import { updatePassword } from '../../actions';

class PasswordUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      newPassword: '',
      retypePassword: '',
      displaySuccess: 'hidden-div',
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRetypePasswordChange = this.handleRetypePasswordChange.bind(this);
    this.handleNewPasswordSubmit = this.handleNewPasswordSubmit.bind(this);
  }

  componentDidMount() {
    const user = this.props.currentUser.id;
    this.setState({ userID: user })
  }

  componentDidUpdate() {}

  handlePasswordChange(e) {
    const { value } = e.target;
    this.setState({ newPassword: value })
  }

  handleRetypePasswordChange(e) {
    const { value } = e.target;
    this.setState({ retypePassword: value })
  }

  handleNewPasswordSubmit(e) {
    e.preventDefault();
    const data = {
      id: this.state.userID,
      password: this.state.newPassword,
    };

    this.props.updatePassword(data);

    this.setState((prevState) => ({
      newPassword: '',
      retypePassword: '',
      displaySuccess: 'displayed-div',
    }));
  }

  render() {
    console.log(this.state)
    if (!this.props.currentUser) {
      return <Redirect to="/not-authorized" />;
    } else {
      const passwordMatch = this.state.newPassword === this.state.retypePassword;
      const isEnabled = this.state.newPassword.length > 5 && this.state.newPassword.length < 100 && passwordMatch;

      return (
        <div className="password-update">
          <h1>Update Your Password</h1>

          <form>
            <p>Password must be at least 6 characters long.</p>
            <div className="input-div">
              <label>New Password:</label>
              <br />
              <input
                type="password"
                name="password"
                value={this.state.newPassword}
                onChange={this.handlePasswordChange}
              />
            </div>

            <div className="input-div">
              <label>Re-Enter New Password:</label>
              <br />
              <input
                type="password"
                name="retypePassword"
                value={this.state.retypePassword}
                onChange={this.handleRetypePasswordChange}
              />
            </div>

            <div className="input-div">
              <button disabled={!isEnabled} onClick={this.handleNewPasswordSubmit}>
                Submit
              </button>
            </div>
          </form>

          <div className={this.state.displaySuccess}>
            <h3>Successfully Changed Password!</h3>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer.user,
    passwordUpdateStatus: state.userReducer.passwordUpdateStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePassword: (data) => dispatch(updatePassword(data)),
  };
};

PasswordUpdate = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PasswordUpdate);

export default PasswordUpdate;
