import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Checkout.scss';
import { grabUserCart } from '../../actions';
import { grabCheckout } from '../../actions';
import ThreadBox from '../ThreadBox';
import { Link } from 'react-router-dom';

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.deleteCartItem = this.deleteCartItem.bind(this);
  }

  componentDidMount() {
    console.log(typeof this.props.grabUserCart);

    this.props.grabUserCart();
    this.props.grabCheckout();
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
    console.log(this.props.checkout);
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

    return (
      <div className="checkout-page">
        <div className="checkout-title">
          <h1>Checkout</h1>
        </div>
        <div className="main-checkout-container">
          <div className="info-review-container">
            <div className="shipping-address-container">shippin</div>

            <div className="payment-method-container">payment</div>

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
    checkout: state.itemReducer.checkout,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    grabUserCart: () => {
      dispatch(grabUserCart());
    },

    grabCheckout: () => {
      dispatch(grabCheckout());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Checkout);
