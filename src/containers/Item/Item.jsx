import React, { Component } from 'react';

import { connect } from 'react-redux';
import './Item.scss';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { name, id, price } = this.props;
    // console.log(this.props.id);
    return (
      <div className="singleItem">
        <div className="imageBox">
          <img
            src="https://3dexport.com/items/2018/07/11/530458/205933/rigged_cartoon_giraffe_model_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_2172968_o.jpg"
            alt=""
            className="itemImage"
          />
        </div>
        <div className="itemDescriptionBox">
          <h4 className="itemName">{name}</h4>
          {/* <div>id={id}</div> */}
          <div className="itemPrice">Price: {price}</div>
        </div>
        <div />
      </div>
    );
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
