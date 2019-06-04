import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './AccountDeactivate.scss';
import { connect } from 'react-redux';
import { deactivateUser, logout } from '../../actions';

class AccountDeactivate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    }
    
    this.handleDeactivate = this.handleDeactivate.bind(this);
  }

  handleDeactivate(e) {
    e.preventDefault();
    // this.props.logout();
    this.props.deactivateUser().then((result) => {
      return <Redirect to="/" />
      console.log('38345', result)
    });
    
    
  }


  render() {

    if (!this.props.user) {
      return <Redirect to="/not-authorized" />;
    } else if (
      parseInt(this.props.match.params.id) !== this.props.user.id
    ) {
      return <Redirect to="/not-authorized" />;
    } else {
      return (
        <div className="deactivate">
          <h2>Deactivate Account</h2>
  
          <p>Note that deactivating your account will not permanently delete your account.  Upon account deactivation, all of your items will be changed to inactive status.  You may log in again to reactivate your account.</p>
  
          <p>Upon account deactivation, you will be logged out of your account and returned to the Home page.</p>
  
          <br></br>
          <br></br>
  
          <button onClick={this.handleDeactivate}>Deactivate My Account</button>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deactivateUser: () => dispatch(deactivateUser()),
    logout: () => dispatch(logout()),
  };
};

AccountDeactivate = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountDeactivate);

export default AccountDeactivate;