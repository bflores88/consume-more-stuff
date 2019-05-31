import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const _PrivateRoute = ({ component: Component, loggedIn, redirectUrl, ...rest }) => {
  console.log('**********', loggedIn)
  if (!loggedIn) {
    return <Redirect to="/" />;
  }
  console.log('**********', this.props)
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};




const mapStateToProps = (state) => {
  return {
    currentUser: state.itemReducer.currentUser,
    loggedIn: state.itemReducer.loggedIn
  };
};

const PrivateRoute = connect(
  mapStateToProps
)(_PrivateRoute);

export default PrivateRoute;