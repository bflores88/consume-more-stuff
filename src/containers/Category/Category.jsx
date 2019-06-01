import React, { Component } from 'react';
import './Category.scss';
import { loadItemsByCategory, grabItemImages } from '../../actions';
import { connect } from 'react-redux';
import Item from '../Item';

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const category = this.props.match.params.category;
    this.props.grabItemImages();
    return this.props.loadItemsByCategory(category);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.category !== prevProps.match.params.category) {
      const category = this.props.match.params.category;
      this.props.grabItemImages();
      return this.props.loadItemsByCategory(category);
    }
  }

  filterImages(id, images) {
    return images.filter((image) => image.item_id === id);
  }

  render() {
    const categoryItems = this.props.itemsByCategory[0];

    if (!categoryItems) {
      return <div>Page Loading...</div>;
    } else {
      const category = {
        name: categoryItems.categoryName,
        items: categoryItems.items,
      };

      const items = category.items.filter((img, key) => {
        return img.active && img.approved;
      });
      console.log(items);

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
        <div className="category-page">
          <div className="categoryBox">
            <div className="item-box-title">
              <h3 className="title-text">{category.name}</h3>
            </div>
            <div className="categoryItemsBox">{itemsBox}</div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    itemsByCategory: state.itemReducer.itemsByCategory,
    images: state.itemReducer.images,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadItemsByCategory: (category) => dispatch(loadItemsByCategory(category)),
    grabItemImages: (item) => dispatch(grabItemImages(item)),
  };
};

Category = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Category);

export default Category;
