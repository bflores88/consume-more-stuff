import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadSpecificItem } from '../../actions';
import { incrementViews } from '../../actions';
import './ItemDetail.scss';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { addItemToCart } from '../../actions';

class ItemDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.addNewItemToCart = this.addNewItemToCart.bind(this);
  }

  componentDidMount() {
    this.props.incrementViews(this.props.match.params.id);
    return this.props.loadSpecificItem(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.incrementViews(this.props.match.params.id);
      return this.props.loadSpecificItem(this.props.match.params.id);
    }
  }

  addNewItemToCart() {
    let data = {};
    data.item_id = parseInt(this.props.match.params.id);
    data.quantity = 1;
    this.props.addItemToCart(data);
  }

  render() {
    if (!this.props.item.name) {
      return <div>Page Loading...</div>;
    } else {
      console.log(this.props.item);
      const item = {
        images: this.props.item.images,
        name: this.props.item.name,
        dims: this.props.item.dimensions,
        price: this.props.item.price,
        quantity: this.props.item.inventory,
        description: this.props.item.description,
        condition: this.props.item.conditions.condition_name,
        status: this.props.item.active,
        subcat: this.props.item.sub_categories.sub_category_name,
        created: this.props.item.created_at,
        updated: this.props.item.updated_at,
        category: this.props.item.categories.category_name,
        seller: this.props.item.users.username,
        sellerID: this.props.item.user_id,
        inventory: this.props.item.inventory,
        view_count: this.props.item.view_count,
      };

      const created = moment(new Date(item.created)).format("MMM DD YYYY")
      const updated = moment(new Date(item.updated)).format("MMM DD YYYY")
      let status;
      if (!item.status) {
        status = 'NOT FOR SALE';
      } else if (item.quantity === 0) {
        status = 'ITEM SOLD OUT';
      } else {
        status = 'AVAILABLE FOR PURCHASE';
      }

      const images = item.images.map((image, key) => {
        let link = image.image_link;
        return <img src={link} />;
      });

      const sellerLink = `/users/${item.sellerID}/items`;

      return (
        <div className="item-detail">
          <div clasName="detail-box">
            <div className="detail-image">{images}</div>

            <div className="detail-descr">
              <h2>{item.name}</h2>
              <h3>{item.dims}</h3>
              <h5>
                Sold By:&nbsp;&nbsp;<Link to={sellerLink}>{item.seller}</Link>
              </h5>
              <h5>Status:&nbsp;&nbsp;{status}</h5>
              <h4>Seller Price:&nbsp;&nbsp;{item.price}</h4>
              <h4>Quantity in Stock:&nbsp;&nbsp;{item.quantity}</h4>
              <h4>Views:&nbsp;&nbsp;{item.view_count}</h4>
              <button onClick={this.addNewItemToCart}>Add To Cart</button>
              <button>Contact Seller</button>
            </div>
          </div>

          <div className="detail-detail">
            <h4>Condition:&nbsp;&nbsp;{item.condition}</h4>
            <h4>Description:</h4>
            {item.description}
            <br />
            <br />
            <br />
            Category:&nbsp;&nbsp;{item.category}
            <br />
            Subcategory:&nbsp;&nbsp;{item.subcat}
            <br />
            <br />
            <br />
            Posting Date:&nbsp;&nbsp;{created}
            <br />
            Last Updated:&nbsp;&nbsp;{updated}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    item: state.itemReducer.item,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    incrementViews: (item) => dispatch(incrementViews(item)),
    loadSpecificItem: (item) => dispatch(loadSpecificItem(item)),
    addItemToCart: (data) => dispatch(addItemToCart(data)),
  };
};

ItemDetail = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemDetail);

export default ItemDetail;
