import React, { Component } from 'react';
import './UserPayments.scss';
import { updatePrimaryPayment } from '../../actions';
import { connect } from 'react-redux';

class UserPayments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      primary: '',
    };

    this.handlePaymentUpdate = this.handlePaymentUpdate.bind(this);
  }

  componentDidMount() {
    if (this.props.card.primary) {
      this.setState({ primary: 'PRIMARY' });
    }
  }

  handlePaymentUpdate(e) {
    e.preventDefault();
    this.setState({primary: 'PRIMARY'})
    this.props.updatePrimaryPayment(this.props.card.id).then((result) => {
      return this.props.reload(e);
    })
  }

  render() {

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
            <button>Remove Payment Option</button>
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
  return {
    updatePrimaryPayment: (id) => dispatch(updatePrimaryPayment(id)),
  };
};

UserPayments = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPayments);

export default UserPayments;
