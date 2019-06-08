import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserAddress.scss';
import { updatePrimaryAdress, removeAddress } from '../../actions';

class UserAddress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      primary: '',
      address: '',
    };

    this.handleAddressUpdate = this.handleAddressUpdate.bind(this);
    this.handleRemoveAddress = this.handleRemoveAddress.bind(this);
  }

  componentDidMount() {
    if (this.props.address.primary) {
      this.setState({
        primary: 'PRIMARY',
        address: this.props.address,
      });
    } else {
      this.setState({
        address: this.props.address,
      });
    }
  }

  handleAddressUpdate(e) {
    e.preventDefault();
    this.setState({ primary: 'PRIMARY' });
    this.props.updatePrimaryAdress(this.props.address.id).then((result) => {
      return this.props.reload(e);
    });
  }

  handleRemoveAddress(e) {
    e.preventDefault();
    this.setState({
      address: '',
    });
    this.props.removeAddress(this.props.address.id)
  }

  render() {
    if (this.state.address) {
      if (this.state.primary) {
        return (
          <div className="address-card">
            <div className="sub-div">
              <h5>Ship To:</h5>
            </div>

            <div className="sub-div">
              <p>{this.state.address.address_name}</p>
              <p>{this.state.address.street}</p>
              <p>{this.state.address.apt_suite}</p>
              <p>
                {this.state.address.city}, {this.state.address.states.name} {this.state.address.zip}
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
              <p>{this.state.address.address_name}</p>
              <p>{this.state.address.street}</p>
              <p>{this.state.address.apt_suite}</p>
              <p>
                {this.state.address.city}, {this.state.address.states.name} {this.state.address.zip}
              </p>
            </div>

            <div className="edit">
              <button onClick={this.handleAddressUpdate}>Set As Primary</button>
              <button onClick={this.handleRemoveAddress}>Remove Address</button>
            </div>
          </div>
        );
      }
    } else {
      return <></>
    }
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePrimaryAdress: (id) => dispatch(updatePrimaryAdress(id)),
    removeAddress: (id) => dispatch(removeAddress(id)),
  };
};

UserAddress = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserAddress);

export default UserAddress;
