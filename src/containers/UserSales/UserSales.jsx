import React, { Component } from 'react';
import './UserSales.scss';
import InactiveItems from '../../components/InactiveItems';
import ActiveItems from '../../components/ActiveItems';
import { connect } from 'react-redux';
import { grabUsername } from '../../actions';
import { grabUserSales } from '../../actions';
import { updateShippingStatus } from '../../actions';

class UserSales extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: '',
    };
  }

  componentDidMount() {
    return this.props.grabUserSales();
  }

  componentDidUpdate(prevProps) {}

  updateStatus(id) {
    this.props.updateShippingStatus(id);
    this.setState({ userID: 'banana' });
    return this.props.grabUserSales();
  }

  render() {
    console.log(this.props.sales);

    let totalPrice = 0;
    let totalSaleAmount = 0;
    let totalEarnings = 0;
    let userSales = this.props.sales.map((sale, idx) => {
      let item = sale;
      let totalSalePrice = Number(parseFloat(item.item_price * item.quantity).toFixed(2));
      totalSaleAmount += item.quantity;

      totalEarnings += parseFloat(parseFloat(totalSalePrice).toFixed(2));
      return (
        <div className="sale-item-box">
          {/* <div className="sale-item-name">{sale.item_name}</div>
           */}
          <img className="sale-item-image" src={item.image_link} alt="" />
          <div className="sale-item-text-box">
            <div className="sale-item-info-box">
              <h4 className="sale-item-tag">Item</h4>
              <div className="sale-item-info">{item.item_name}</div>

              <div className="sale-item-info">Quantity: {item.quantity}</div>
              <div className="sale-item-info">Item Price: $ {totalSalePrice}</div>
              <div className="sale-item-info">Shipping Cost: $ {item.shipping_cost}</div>
            </div>
            <div className="sale-shipping-info-box">
              <div children="sale-shipping-info-inner-box">
                <h4 className="sale-shipping-tag">Shipping</h4>
                <div className="sale-shipping-address">{item.purchased_by}</div>
                <div className="sale-shipping-address">{item.shipping_addr_street}</div>
                <div className="sale-shipping-address">
                  {item.shipping_addr_city}, {item.shipping_addr_state_abbr} {item.shipping_addr_zip}
                </div>
                <div className="sale-status-box">
                  <div className="current-status">Shipping Status: {item.status}</div>
                  {/* <select name="" id="">
                    <option value="1">Submitted</option>
                    <option value="3">Shipped</option>
                    <option value="4">Delivered</option>
                  </select> */}
                  <button
                    onClick={() => {
                      this.updateStatus(item.id);
                    }}
                  >
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="cart-item-total-price">Total Cost for Item: $ {totalItemPrice}</div> */}
        </div>
      );
    });

    return (
      <div className="sales-page">
        <div className="sales-page-title">
          <h1 className="sales-title">Your Sales</h1>
          <div className="total-sales-info-box">
            {/* <div>Sales Information</div> */}
            <div className="total-sales">Total Sales: {totalSaleAmount}</div>
            <div className="total-earnings">Total Earnings: $ {totalEarnings}</div>
          </div>
        </div>
        <div className="sales-items-container">
          <div>{userSales}</div>
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
    sales: state.itemReducer.sales,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    grabUserSales: () => dispatch(grabUserSales()),
    updateShippingStatus: (id, data) => dispatch(updateShippingStatus(id, data)),
  };
};

UserSales = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserSales);

export default UserSales;
