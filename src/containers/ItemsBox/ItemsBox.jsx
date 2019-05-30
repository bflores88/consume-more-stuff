import React, { Component } from 'react';
import Item from '../Item';
import './ItemsBox.scss';
import { connect } from 'react-redux';
import { grabItemImages } from '../../actions';

class ItemsBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      items: [{ name: 'banana' }, { name: 'kiwi' }],
    };

    // this.handleInputChange = this.handleInputChange.bind(this);
  }

  // grabImages() {
  //   this.props.grabItemImages();
  //   return this.props.images;
  // }

  componentDidMount() {
    // return this.props.loadUsers() && this.props.loadCards() && console.log(this.props.cards);
    return this.props.grabItemImages();
  }

  filterItems(label, items) {
    switch (label) {
      case 'Electronics':
        return items.filter((item) => item.category_id === 1);
      case 'Apparel':
        return items.filter((item) => item.category_id === 2);
      case 'Books':
        return items.filter((item) => item.category_id === 3);
      default:
        return items;
    }
  }
  filterImages(id, images) {
    return images.filter((image) => image.item_id === id);
  }

  render() {
    const filteredItems = this.filterItems(this.props.label, this.props.items);
    // const images = this.grabImages();
    const itemsBox = filteredItems.map((item, idx) => {
      let itemLink = this.filterImages(item.id, this.props.images);
      console.log(itemLink);
      return <Item name={item.name} id={item.id} price={item.price} />;
    });
    return (
      <div>
        <div className="item-box-title">
          <h3 className="title-text">{this.props.label}</h3>
        </div>
        <div className="itemsBox">{itemsBox}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    images: state.itemReducer.images,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    grabItemImages: (item) => {
      dispatch(grabItemImages(item));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemsBox);
