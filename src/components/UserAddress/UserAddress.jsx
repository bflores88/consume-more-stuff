import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserAddress.scss';
import { grabShipping } from '../../actions';

class UserAddress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      primary: '',
    };
  }

  componentDidMount() {
    if (this.props.address.primary) {
      this.setState({
        primary: 'PRIMARY',
      });
    }
  }

  render() {

    if (this.state.primary) {
      return (
        <div className="address-card">
          <div className="sub-div">
            <h5>Ship To:</h5>
          </div>

          <div className="sub-div">
            <p>{this.props.address.address_name}</p>
            <p>{this.props.address.street}</p>
            <p>{this.props.address.apt_suite}</p>
            <p>
              {this.props.address.city}, {this.props.address.states.name} {this.props.address.zip}
            </p>
          </div>

          <div className="sub-div">
            <p className="primary">{this.state.primary}</p>
          </div>
        </div>
      );

    } else {
      return (
        <div className="address-card">
          <div className="sub-div">
            <h5>Ship To:</h5>
          </div>

          <div className="sub-div">
            <p>{this.props.address.address_name}</p>
            <p>{this.props.address.street}</p>
            <p>{this.props.address.apt_suite}</p>
            <p>
              {this.props.address.city}, {this.props.address.states.name} {this.props.address.zip}
            </p>
          </div>

          <div className="edit">
            <button>Set As Primary</button>
            <button>Remove Address</button>
          </div>

        </div>
      );

    }

    
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

UserAddress = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserAddress);

export default UserAddress;
