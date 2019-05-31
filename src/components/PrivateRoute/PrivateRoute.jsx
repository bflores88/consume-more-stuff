import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const PrivateRoute = ({ component: Component, ...rest }) => {
  if (!this.props.currentUser) {
    return <Redirect to="/" />;
  }
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};


const mapStateToProps = (state) => {
  return {
    currentUser: state.itemReducer.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};

};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrivateRoute);