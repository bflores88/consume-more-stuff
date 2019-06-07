import React, { Component } from 'react';
import './UserSales.scss';
import InactiveItems from '../../components/InactiveItems';
import ActiveItems from '../../components/ActiveItems';
import { connect } from 'react-redux';
import { grabUsername } from '../../actions';
import { grabUserSales } from '../../actions';

class UserSales extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: '',
    };
  }

  componentDidMount() {
    this.props.grabUserSales();
  }

  componentDidUpdate(prevProps) {}

  render() {
    return <div>bananA</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.itemReducer.username,
    currentUser: state.userReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    grabUserSales: () => dispatch(grabUserSales()),
  };
};

UserSales = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserSales);

export default UserSales;
