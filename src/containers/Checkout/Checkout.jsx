import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Checkout.scss';
import { grabUserCart } from '../../actions';
import { grabShipping } from '../../actions';
import { grabShippingPrimary } from '../../actions';
import { grabPayments } from '../../actions';
import { postNewOrder } from '../../actions';
import ThreadBox from '../ThreadBox';
import { Link } from 'react-router-dom';
import { tsPropertySignature } from '@babel/types';

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payment_dropdown_id: '',
      shipping_dropdown_id: '',
    };
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.deleteCartItem = this.deleteCartItem.bind(this);
    this.createOrder = this.createOrder.bind(this);
  }

  handleInputOnChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    return this.setState({ [name]: value });
  }

  componentDidMount() {
    this.props.grabUserCart();
    this.props.grabShipping();
    this.props.grabShippingPrimary();
    this.props.grabPayments();
  }

  componentDidUpdate(prevProps) {}

  deleteCartItem(id) {
    this.props.deleteItemFromCart(id);
    this.props.grabUserCart();
  }

  createOrder() {
    let cartArray = [];

    this.props.cart_items.map((item, idx) => {
      let itemObj = {};
      itemObj.item_id = item.item_id;
      itemObj.quantity = item.quantity;
      cartArray.push(itemObj);
    });

    let data = {};
    data.shipping_address_id = this.state.shipping_dropdown_id;
    data.payment_card_id = this.state.payment_dropdown_id;
    data.orders = cartArray;
    return this.props.postNewOrder(data);
  }

  render() {
    console.log(this.props.shipping);
    // console.log(this.props.shippingPrimary[0].id);
    // item operations below
    let allItemsPrice = 0;
    let totalPrice = 0;
    let totalShipping = 0;
    let totalQuantity = 0;

    let cartItems = this.props.cart_items.map((item, idx) => {
      let totalItemPrice =
        Number(parseFloat(item.price * item.quantity).toFixed(2)) + Number(parseFloat(item.shipping_cost).toFixed(2));
      totalShipping += parseFloat(item.shipping_cost);
      allItemsPrice += Number(parseFloat(item.price * item.quantity).toFixed(2));
      totalPrice += parseFloat(parseFloat(totalItemPrice).toFixed(2));
      totalQuantity += Number(item.quantity);
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
              {/* <button
                // onMouseOver={this.changeHover(item.id)}

                className="delete-item-button"
              >
                Delete Item From Cart
              </button> */}
            </div>
          </div>
        </div>
      );
    });

    let shippingOptions = this.props.shipping.map((address, idx) => {
      return (
        <option className="select-selected" value={address.id}>
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

    let totalBeforeTax = parseFloat(allItemsPrice + totalShipping).toFixed(2);

    // calculate tax
    let totalTax = 0;
    let totalOrderPrice = totalBeforeTax;
    if (this.state.shipping_dropdown_id !== '') {
      let currentAddress = this.props.shipping.filter((ship) => ship.id == this.state.shipping_dropdown_id);

      let taxRate = parseFloat(currentAddress[0].states.tax_rate);

      totalTax = parseFloat(Number(totalBeforeTax) * taxRate).toFixed(2);
      totalOrderPrice = parseFloat(Number(totalBeforeTax) + Number(totalTax)).toFixed(2);

      // return images.filter((image) => image.item_id === id);
    } else {
      totalTax = 0;
    }

    return (
      <div className="checkout-page">
        <div className="checkout-title">
          <h1>Checkout</h1>
        </div>
        <div className="main-checkout-container">
          <div className="info-review-container">
            <div className="shipping-address-container">
              <h4>Confirm Shipping</h4>
              <div className="custom-select">
                <select
                  name="shipping_dropdown_id"
                  className="select"
                  value={this.state.shipping_dropdown_id}
                  onChange={this.handleInputOnChange}
                  // onChange={this.changeSubCategories}
                  required
                >
                  <option className="select-selected" value="">
                    Choose a Category
                  </option>
                  {shippingOptions}
                </select>
              </div>
            </div>

            <div className="payment-method-container">
              <h4>Confirm Payment Method</h4>
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

            <div className="review-items-container">
              <h4>Confirm Items</h4>
              {cartItems}
            </div>
          </div>
          <div className="quick-order-container">
            <div className="quick-order-box">
              <div className="order-price-info-container">
                <h4>Order Summary</h4>
                <div className="order-items-price-box">
                  <div>Items ({totalQuantity}) :</div>
                  <div>${parseFloat(allItemsPrice).toFixed(2)}</div>
                </div>
                <div className="order-items-shipping-box">
                  <div>Cost of Shipping :</div>
                  <div className="order-shipping-price">${parseFloat(totalShipping).toFixed(2)}</div>
                </div>
                <div className="order-items-before-tax-box">
                  <div>Total before tax :</div>
                  <div className="order-shipping-price">${parseFloat(totalBeforeTax).toFixed(2)}</div>
                </div>

                <div className="order-items-estimated-tax-box">
                  <div>Estimated Tax :</div>
                  <div className="order-shipping-price">${totalTax}</div>
                </div>

                <div className="order-items-total-price-box">
                  <div>Total Price :</div>
                  <div className="order-shipping-price">${totalOrderPrice}</div>
                </div>
              </div>
              <div id="place-order-button-box">
                <Link to="/">
                  <button onClick={this.createOrder} id="place-order-button">
                    Place Your Order
                  </button>
                </Link>
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
    shippingPrimary: state.itemReducer.shippingPrimary,
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
    grabShippingPrimary: () => {
      dispatch(grabShippingPrimary());
    },
    grabPayments: () => {
      dispatch(grabPayments());
    },
    postNewOrder: (data) => {
      dispatch(postNewOrder(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Checkout);
