import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './AdminAllItems.scss';
import { loadItems } from '../../actions';
import AdminItemCard from '../../components/AdminItemCard';

class AdminAllItems extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    return this.props.loadItems();
  }

  render() {
    const spreadItems = this.props.items.map((item, idx) => {
      const price = `$ ${item.price}`;
      const shipping = `$ ${item.shipping_cost}`;
      let image = 'https://3dexport.com/items/2018/07/11/530458/205933/rigged_cartoon_giraffe_model_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_2172968_o.jpg'

      if (item.images[0].image_link) {
        image = item.images[0].image_link;
      }


      return (
        <AdminItemCard
          id={item.id}
          name={item.name}
          description={item.description}
          dims={item.dimensions}
          sellerID={item.user_id}
          seller={item.users.name}
          condition={item.conditions.condition_name}
          category={item.categories.category_name}
          subCategory={item.sub_categories.sub_category_name}
          inventory={item.inventory}
          price={price}
          shipping={shipping}
          views={item.view_count}
          image={image}
          active={item.active}
          approved={item.approved}
        />
      );
    });

    if (!this.props.user) {
      return <Redirect to="/not-authorized" />;
    } else if (this.props.user.role_id === 3) {
      return <Redirect to="/not-authorized" />;
    } else {
      return (
        <div className="admin-items">
          <h1>All Items</h1>
          {spreadItems}
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    // updatedUser: state.userReducer.updatedUser,
    items: state.itemReducer.items,
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // adminUserEdit: (data) => dispatch(adminUserEdit(data)),
    loadItems: () => dispatch(loadItems()),
  };
};

AdminAllItems = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminAllItems);

export default AdminAllItems;
