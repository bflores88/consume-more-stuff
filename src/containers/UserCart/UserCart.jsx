import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './UserCart.scss';
import { grabUserCart } from '../../actions';
import { loadSpecificItem } from '../../actions';
import { deleteItemFromCart } from '../../actions';
import ThreadBox from '../ThreadBox';
import { Link } from 'react-router-dom';

class UserCart extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.deleteCartItem = this.deleteCartItem.bind(this);
  }

  componentDidMount() {
    console.log(typeof this.props.grabUserCart);

    this.props.grabUserCart();
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
    console.log(this.props.cart_items);
    let totalPrice = 0;
    let cartItems = this.props.cart_items.map((item, idx) => {
      let totalItemPrice =
        parseFloat(parseFloat(item.price * item.quantity).toFixed(2)) +
        parseFloat(parseFloat(item.shipping_cost).toFixed(2));
      totalPrice += parseFloat(parseFloat(totalItemPrice).toFixed(2));
      return (
        <div className="cart-item-box">
          <div className="cart-item-image-box">
            <img src={item.item_image} alt="" className="cart-item-image" />
          </div>
          <div className="cart-item-information-box">
            <div className="cart-item-inner-info-box">
              <div className="cart-item-name">{item.item_name}</div>
              <div className="cart-item-seller cart-item-info">Seller: {item.seller}</div>
              <div className="cart-item-quantity cart-item-info">Quantity: {item.quantity}</div>
              <div className="cart-item-price cart-item-info">Item Price: $ {item.price}</div>
              <div className="cart-item-price cart-item-info">Shipping Cost: $ {item.shipping_cost}</div>
              <div className="cart-item-total-price">Total Cost for Item: $ {totalItemPrice}</div>
              <button
                // onMouseOver={this.changeHover(item.id)}
                onClick={() => {
                  this.deleteCartItem(item.id);
                }}
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
      <div className="cart-page">
        <div className="cart-page-title">
          <h1>Your Cart</h1>
          <div>{this.state.hoverId}</div>
        </div>
        <div className="cart-items-container">
          <div className="small-cart-container">{cartItems}</div>
        </div>
        <div className="total-price-container">Total Price: $ {totalPrice}</div>
        <div className="checkout-container">
          <Link to="/checkout">
            <button className="checkout-button">Checkout</button>
          </Link>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    grabUserCart: () => {
      dispatch(grabUserCart());
    },
    loadSpecificItem: () => {
      dispatch(loadSpecificItem());
    },
    deleteItemFromCart: (id) => {
      dispatch(deleteItemFromCart(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserCart);
