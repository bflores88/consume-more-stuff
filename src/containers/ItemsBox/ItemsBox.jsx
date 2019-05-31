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
        return items.filter((item) => item.category.id === 1);
    }
  }
  filterImages(id, images) {
    return images.filter((image) => image.item_id === id);
  }

  render() {
    const filteredItems = this.filterItems(this.props.label, this.props.items);
    const itemsBox = filteredItems.map((item, idx) => {
      let itemLink = this.filterImages(item.id, this.props.images);
      console.log(this.props.images)

      if (itemLink[0]) {
        return <Item name={item.name} id={item.id} price={item.price} imageLink={itemLink[0].imageLink} />;
      } else {
        return (
          <Item
            name={item.name}
            id={item.id}
            price={item.price}
            imageLink="https://3dexport.com/items/2018/07/11/530458/205933/rigged_cartoon_giraffe_model_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_2172968_o.jpg"
          />
        );
      }
    });

    return (
      <div className="categoryBox">
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
