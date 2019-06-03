import React, { Component } from 'react';
import './ActiveItems.scss';
import { loadActiveItems, grabItemImages } from '../../actions';
import { connect } from 'react-redux';
import Item from '../../containers/Item';
import EditItemsDiv from '../../components/EditItemsDiv'

class ActiveItems extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.grabItemImages();
    const id = this.props.id;
    return this.props.loadActiveItems(id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      const id = this.props.id;
      this.props.grabItemImages();
      return this.props.loadActiveItems(id);
    }
  }

  filterImages(id, images) {
    return images.filter((image) => image.item_id === id);
  }

  render() {
    const activeStatus = true;
    const items = this.props.activeItems;
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

      if (this.props.isUserOnOwnPage) {
        if (itemLink[0]) {
          return (
            <div className="user-item">
              <div>
                <Item name={item.name} id={item.id} price={item.price} imageLink={itemLink[0].imageLink} />
              </div>
              <EditItemsDiv id={item.id} activeStatus={activeStatus} />
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
              <EditItemsDiv id={item.id} activeStatus={activeStatus} />
            </div>
          );
        }
      } else {
        if (itemLink[0]) {
          return (
            <div className="user-item">
              <div>
                <Item name={item.name} id={item.id} price={item.price} imageLink={itemLink[0].imageLink} />
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
            </div>
          );
        }
      }

    });

    return (
      <>
        <h1>Items Available For Sale</h1>
        <div className="activeItemsBox">{itemsBox}</div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.itemReducer.currentUser,
    activeItems: state.itemReducer.activeItems,
    images: state.itemReducer.images,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadActiveItems: (userID) => dispatch(loadActiveItems(userID)),
    grabItemImages: (item) => dispatch(grabItemImages(item)),
  };
};

ActiveItems = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveItems);

export default ActiveItems;
