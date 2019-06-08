import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import './Item.scss';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { name, id, price, image_link } = this.props;
    const itemID = id;
    const redirectTo = `/items/${itemID}`;

    if (image_link) {
      return (
        <Link to={redirectTo}>
          <div className="singleItem">
            <div className="imageBox">
              <img
                // src="https://3dexport.com/items/2018/07/11/530458/205933/rigged_cartoon_giraffe_model_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_2172968_o.jpg"
                src={image_link}
                alt=""
                className="itemImage"
              />
            </div>
            <div className="itemDescriptionBox">
              <h4 className="itemName">{name}</h4>
              <div className="itemPrice">Price: {price}</div>
            </div>
            <div />
          </div>
        </Link>
      );
    } else {
      return (
        <Link to={redirectTo}>
          <div className="singleItem">
            <div className="imageBox">
              {/* <img
              // src="https://3dexport.com/items/2018/07/11/530458/205933/rigged_cartoon_giraffe_model_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_2172968_o.jpg"
              src={image_link}
              alt=""
              className="itemImage"
            /> */}
            </div>
            <div className="itemDescriptionBox">
              <h4 className="itemName">{name}</h4>
              <div className="itemPrice">Price: {price}</div>
            </div>
            <div />
          </div>
        </Link>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Item);
