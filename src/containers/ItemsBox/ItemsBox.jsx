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
  }

  componentDidMount() {
    return this.props.grabItemImages();
  }

  filterItems(label, id, items) {
    switch (label) {
      case label:
        return items
          .filter((item) => item.users.active && item.inventory > 0 && item.approved && item.category_id === parseInt(id))
          .sort((a, b) => b.view_count - a.view_count);
      default:
        return;
    }
  }

  filterImages(id, images) {
    return images.filter((image) => image.item_id === id);
  }

  render() {
    const filteredItems = this.filterItems(this.props.label, this.props.labelID, this.props.items);
    const itemsBox = filteredItems.map((item, idx) => {
      let itemLink;
      if (this.props.images) {
        itemLink = this.filterImages(item.id, this.props.images);
      } else {
        itemLink = [
          {
            image_link:
              'https://3dexport.com/items/2018/07/11/530458/205933/rigged_cartoon_giraffe_model_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_2172968_o.jpg',
          },
        ];
      }

      if (itemLink[0]) {
        return <Item name={item.name} id={item.id} price={item.price} image_link={itemLink[0].image_link} />;
      } else {
        return (
          <Item
            name={item.name}
            id={item.id}
            price={item.price}
            image_link="https://3dexport.com/items/2018/07/11/530458/205933/rigged_cartoon_giraffe_model_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_2172968_o.jpg"
          />
        );
      }
    });

    if (!filteredItems.length) {
      return (<></>)
    } else if (!itemsBox) {
      return (
        <div className="categoryBox">
          <div className="item-box-title">
            <h3 className="title-text">{this.props.label}</h3>
          </div>
          <div className="itemsBox">
            <h2>Currently no items available for this category.</h2>
          </div>
        </div>
      );
    } else {
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
}

const mapStateToProps = (state) => {
  return {
    images: state.itemReducer.images,
    categories: state.itemReducer.categories,
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
