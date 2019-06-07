import React, { Component } from 'react';
import './UserPayments.scss';

class UserPayments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      primary: '',
    };
  }

  componentDidMount() {
    if (this.props.card.primary) {
      this.setState({ primary: 'PRIMARY' });
    }
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
            <button>Set As Primary</button>
            <button>Remove Payment Option</button>
          </div>
  
  
        </div>
      );


    }
    
  }
}

export default UserPayments;
