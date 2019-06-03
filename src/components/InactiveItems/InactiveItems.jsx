import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './InactiveItems.scss';
import { loadInactiveItems, grabItemImages } from '../../actions';
import { connect } from 'react-redux';
import Item from '../../containers/Item';

class InactiveItems extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.grabItemImages();
    const id = this.props.id;
    return this.props.loadInactiveItems(id);
  }

  filterImages(id, images) {
    return images.filter((image) => image.item_id === id);
  }

  render() {
    const items = this.props.inactiveItems;
    console.log(items)
    const itemsBox = items.map((item, idx) => {
 
      let itemLink;
      if (this.props.images) {
        itemLink = this.filterImages(item.id, this.props.images);
      } else {
        itemLink = [
          {
            imageLink:
              'https://3dexport.com/items/2018/07/11/530458/205933/rigged_cartoon_giraffe_model_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_2172968_o.jpg',
          },
        ];
      }

      if (itemLink[0]) {
        return (
          <div className="user-item">
            <div>
              <Item name={item.name} id={item.id} price={item.price} imageLink={itemLink[0].imageLink} />
            </div>
            <div className="edit-buttons">
              <button>Edit Item</button>
              <button>Make Active</button>
            </div>
          </div>
        );
      } else {
        return (
          <div className="user-item">
            <div>
              <Item
                name={item.name}
                id={item.id}
                price={item.price}
                imageLink="https://3dexport.com/items/2018/07/11/530458/205933/rigged_cartoon_giraffe_model_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_2172968_o.jpg"
              />
            </div>
            <div className="edit-buttons">
              <button>Edit Item</button>
              <button>Make Active</button>
            </div>
          </div>
        );
      }
    });

    return (
      <>
        <h1>Inactive Items</h1>
        <div className="inactiveItemsBox">{itemsBox}</div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.itemReducer.currentUser,
    inactiveItems: state.itemReducer.inactiveItems,
    images: state.itemReducer.images,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadInactiveItems: (userID) => dispatch(loadInactiveItems(userID)),
    grabItemImages: (item) => dispatch(grabItemImages(item)),
  };
};

InactiveItems = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InactiveItems);

export default InactiveItems;
