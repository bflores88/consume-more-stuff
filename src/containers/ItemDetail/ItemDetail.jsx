import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadSpecificItem } from '../../actions';
import './ItemDetail.scss';

class ItemDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    return this.props.loadSpecificItem(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      return this.props.loadSpecificItem(this.props.match.params.id);
    }
  }

  render() {
    if (!this.props.item.name) {
      return <div>Page Loading...</div>;
    } else {
      const item = {
        images: this.props.item.images,
        name: this.props.item.name,
        dims: this.props.item.dimensions,
        price: this.props.item.price,
        quantity: this.props.item.inventory,
        description: this.props.item.description,
        condition: this.props.item.conditions.conditionName,
        status: this.props.item.active,
        subcat: this.props.item.subCategories.subCategoryName,
        created: this.props.item.created_at,
        updated: this.props.item.updated_at,
        category: this.props.item.categories.categoryName,
        seller: this.props.item.users.username,
        sellerID: this.props.item.user_id,
      };
      console.log(this.props.item)

      let status;
      if (!item.status) {
        status = "NOT FOR SALE"
      } else if (item.quantity === 0) { 
        status = "ITEM SOLD OUT"
      } else {
        status="AVAILABLE FOR PURCHASE"
      }

      const images = item.images.map((image, key) => {
        let link = image.imageLink;
        return <img src={link} />;
      });

      return (
        <div className="item-detail">
          <div clasName="detail-box">
            <div className="detail-image">{images}</div>

            <div className="detail-descr">
              <h2>{item.name}</h2>
              <h3>{item.dims}</h3>
              <h5>Sold By:&nbsp;&nbsp;{item.seller}</h5>
              <h5>Status:&nbsp;&nbsp;{status}</h5>
              <h4>Seller Price:&nbsp;&nbsp;{item.price}</h4>
              <h4>Quantity in Stock:&nbsp;&nbsp;{item.quantity}</h4>
              <button>Add To Cart</button>
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
            Posting Date:&nbsp;&nbsp;{item.created}
            <br />
            Last Updated:&nbsp;&nbsp;{item.updated}
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
    loadSpecificItem: (item) => dispatch(loadSpecificItem(item)),
  };
};

ItemDetail = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemDetail);

export default ItemDetail;
