import React, { Component } from 'react';
import './UserPayments.scss';
import { updatePrimaryPayment, removePayment } from '../../actions';
import { connect } from 'react-redux';

class UserPayments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      primary: '',
      card: '',
    };

    this.handlePaymentUpdate = this.handlePaymentUpdate.bind(this);
    this.handleRemoveAddress = this.handleRemoveAddress.bind(this);
  }

  componentDidMount() {
    if (this.props.card.primary) {
      this.setState({
        primary: 'PRIMARY',
        card: this.props.card,
      });
    } else {
      this.setState({
        card: this.props.card,
      });
    }
  }

  handlePaymentUpdate(e) {
    e.preventDefault();
    this.setState({ primary: 'PRIMARY' });
    this.props.updatePrimaryPayment(this.props.card.id).then((result) => {
      return this.props.reload(e);
    });
  }

  handleRemoveAddress(e) {
    e.preventDefault();
    this.setState({
      card: '',
    });
    this.props.removePayment(this.props.card.id);
  }

  render() {
    if (this.state.card) {
      if (this.state.primary) {
        return (
          <div className="payment-card">
            <div className="sub-div">
              <p>{this.props.lastFour(this.props.card.card_number)}</p>
              <p>{this.props.card.card_name}</p>
              <p>Expires&nbsp;{this.props.card.expiration}</p>
            </div>

            <div className="sub-div">
              <p className="primary">{this.state.primary}</p>
            </div>
          </div>
        );
      } else {
        return (
          <div className="payment-card">
            <div className="sub-div">
              <p>{this.props.lastFour(this.props.card.card_number)}</p>
              <p>{this.props.card.card_name}</p>
              <p>Expires&nbsp;{this.props.card.expiration}</p>
            </div>

            <div className="edit">
              <button onClick={this.handlePaymentUpdate}>Set As Primary</button>
              <button onClick={this.handleRemoveAddress}>Remove Payment Option</button>
            </div>
          </div>
        );
      }
    } else {
      return <></>;
    }
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePrimaryPayment: (id) => dispatch(updatePrimaryPayment(id)),
    removePayment: (id) => dispatch(removePayment(id)),
  };
};

UserPayments = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPayments);

export default UserPayments;
