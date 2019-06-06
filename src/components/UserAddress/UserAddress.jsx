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
    return this.props.grabShipping();
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
    shipping: state.itemReducer.shipping,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    grabShipping: () => dispatch(grabShipping()),
  };
};

UserAddress = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserAddress);

export default UserAddress;