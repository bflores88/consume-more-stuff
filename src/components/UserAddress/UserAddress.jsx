import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserAddress.scss';
import { grabShipping } from '../../actions';

class UserAddress extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  componentDidMount() {

  }

  render() {
    console.log(this.props.shipping)
    return (
      <h1>Imported User Settings Component</h1>
    )
  }

}

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

UserAddress = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserAddress);

export default UserAddress;