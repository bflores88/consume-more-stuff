import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Checkout.scss';
import { grabUserCart } from '../../actions';
import { grabShipping } from '../../actions';
import { grabPayments } from '../../actions';
import ThreadBox from '../ThreadBox';
import { Link } from 'react-router-dom';

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payment_dropdown_id: '',
      shipping_dropdown_id: '',
    };
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.deleteCartItem = this.deleteCartItem.bind(this);
  }

  handleInputOnChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    // console.log
    console.log(name, value);
    return this.setState({ [name]: value });
  }

  componentDidMount() {
    this.props.grabUserCart();
    this.props.grabShipping();
    this.props.grabPayments();
  }

  componentDidUpdate(prevProps) {
    // console.log(this.props.currentUser);
    // if (this.props.currentUser !== prevProps.currentUser) {
    //   const user = this.props.currentUser;
    // }
    // // this.props.grabUserThreads();
  }

  deleteCartItem(id) {
    this.props.deleteItemFromCart(id);
    this.props.grabUserCart();
  }

  render() {
    // item operations below
    let allItemsPrice = 0;
    let totalPrice = 0;
    let cartItems = this.props.cart_items.map((item, idx) => {
      let totalItemPrice =
        Number(parseFloat(item.price * item.quantity).toFixed(2)) + Number(parseFloat(item.shipping_cost).toFixed(2));

      allItemsPrice += Number(parseFloat(item.price).toFixed(2));
      totalPrice += parseFloat(parseFloat(totalItemPrice).toFixed(2));
      return (
        <div className="checkout-item-box">
          <div className="checkout-item-image-box">
            <img src={item.item_image} alt="" className="checkout-item-image" />
          </div>
          <div className="checkout-item-information-box">
            <div className="checkout-item-inner-info-box">
              <div className="checkout-item-name">{item.item_name}</div>

              <div className="checkout-item-info">Quantity: {item.quantity}</div>
              <div className="checkout-item-info">Item Price: $ {item.price}</div>
              <div className="checkout-item-info">Shipping Cost: $ {item.shipping_cost}</div>
              <div className="checkout-item-total-price">Total Cost for Item: $ {totalItemPrice}</div>
              <button
                // onMouseOver={this.changeHover(item.id)}

                className="delete-item-button"
              >
                Delete Item From Cart
              </button>
            </div>
          </div>
        </div>
      );
    });

    // payment/shipping below
    console.log('shipping', this.props.shipping);
    console.log('payments', this.props.payments);

    let shippingOptions = this.props.shipping.map((address, idx) => {
      return (
        <option value={address.id}>
          {address.street}, {address.city}, {address.states.postal_code}
        </option>
      );
    });

    let paymentOptions = this.props.payments.map((method, idx) => {
      let lastFourDigits = method.card_number.substr(method.card_number.length - 4);
      let asteriskLength = method.card_number.length - 4;

      let censoredCardNumber = '*'.repeat(asteriskLength) + lastFourDigits;

      return <option value={method.id}>{censoredCardNumber}</option>;
    });

    return (
      <div className="checkout-page">
        <div className="checkout-title">
          <h1>Checkout</h1>
        </div>
        <div className="main-checkout-container">
          <div className="info-review-container">
            <div className="shipping-address-container">
              <div>Confirm Shipping</div>
              <select
                name="shipping_dropdown_id"
                className="select"
                value={this.state.shipping_dropdown_id}
                onChange={this.handleInputOnChange}
                // onChange={this.changeSubCategories}
                required
              >
                <option value="">Choose a Category</option>
                {shippingOptions}
              </select>
            </div>

            <div className="payment-method-container">
              <div>Confirm Payment Method</div>
              <select
                name="payment_dropdown_id"
                className="select"
                value={this.state.payment_dropdown_id}
                onChange={this.handleInputOnChange}
                // onChange={this.changeSubCategories}
                required
              >
                <option value="">Choose a Category</option>
                {paymentOptions}
              </select>
            </div>

            <div className="review-items-container">{cartItems}</div>
          </div>
          <div className="quick-order-container">
            <div className="quick-order-box">
              <div className="order-price-info-container">
                <div className="order-items-price-box">
                  <div>Items ({this.props.cart_items.length}) :</div>
                  <div>${allItemsPrice}</div>
                </div>
                <div className="order-items-shipping-box">
                  <div>Shipping and Handling :</div>
                  <div>${allItemsPrice}</div>
                </div>
              </div>
              <div id="place-order-button-box">
                <button id="place-order-button">Place Your Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer.user,
    threads: state.itemReducer.threads,
    cart_items: state.itemReducer.cart_items,
    shipping: state.itemReducer.shipping,
    payments: state.itemReducer.payments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    grabUserCart: () => {
      dispatch(grabUserCart());
    },

    grabShipping: () => {
      dispatch(grabShipping());
    },
    grabPayments: () => {
      dispatch(grabPayments());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Checkout);
