import React, { Component } from 'react';
import './UserOrders.scss';
import InactiveItems from '../../components/InactiveItems';
import ActiveItems from '../../components/ActiveItems';
import { connect } from 'react-redux';
import { grabUsername } from '../../actions';
import { grabUserOrders } from '../../actions';

class UserOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: '',
    };
  }

  componentDidMount() {
    return this.props.grabUserOrders();
  }

  componentDidUpdate(prevProps) {}

  render() {
    console.log('frontend orders', this.props.orders);

    let totalSpent = 0;

    let UserOrders = this.props.orders.map((transaction, idx) => {
      // map out orders for each transaction
      let TransactionOrders = transaction.txn_orders.map((item, idx) => {
        totalSpent += Number(parseFloat(item.item_price).toFixed(2));
        let orderStatus;
        if (item.order_status == 'Submitted') {
          orderStatus = <div className="processing-order">{item.order_status}</div>;
        } else if (item.order_status == 'Shipped') {
          orderStatus = <div className="shipped-order">{item.order_status}</div>;
        } else if (item.order_status == 'Delivered') {
          orderStatus = <div className="delivered-order">{item.order_status}</div>;
        }
        return (
          <div className="order-item-box">
            <div className="order-item-info-box">
              <div className="order-item-info">Item Name: {item.item_name}</div>
              <div className="order-item-info">Price: $ {parseFloat(item.item_price).toFixed(2)}</div>
            </div>
            <div className="order-details-box">Order Status: {orderStatus}</div>
          </div>
        );
      });
      return (
        <div className="transaction-item-box">
          {/* <div className="sale-item-name">{sale.item_name}</div>
           */}
          <div className="transaction-info-box">
            <h4 className="transaction-item-tag">Transaction</h4>

            <div className="transaction-item-info">{TransactionOrders}</div>
          </div>

          {/* <div className="cart-item-total-price">Total Cost for Item: $ {totalItemPrice}</div> */}
        </div>
      );
    });

    return (
      <div className="sales-page">
        <div className="sales-page-title">
          <h1 className="sales-title">Your Orders</h1>
          <div className="total-sales-info-box">
            {/* <div>Sales Information</div> */}
            {/* <div className="total-sales">Total Sales: </div> */}
            <div className="total-earnings">Total Spent: $ {parseFloat(totalSpent).toFixed(2)} (how could you?)</div>
          </div>
        </div>
        <div className="transactions-container">
          <div>{UserOrders}</div>
        </div>
        <div className="total-price-container" />
        <div className="checkout-container" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.itemReducer.username,
    currentUser: state.userReducer.user,
    orders: state.itemReducer.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    grabUserOrders: () => dispatch(grabUserOrders()),
  };
};

UserOrders = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserOrders);

export default UserOrders;
