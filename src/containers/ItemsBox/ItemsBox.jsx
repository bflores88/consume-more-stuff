import React, { Component } from 'react';
import Item from '../Item';
import './ItemsBox.scss';
import { connect } from 'react-redux';

class ItemsBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      items: [{ name: 'banana' }, { name: 'kiwi' }],
    };

    // this.handleInputChange = this.handleInputChange.bind(this);
  }

  // handleInputChange(e) {
  //   const { value } = e.target;
  //   this.setState({ input: value });
  // }

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

  render() {
    console.log(this.props.items);
    const filteredItems = this.filterItems(this.props.label, this.props.items);
    console.log(filteredItems);
    const itemsBox = filteredItems.map((item, idx) => {
      return <Item name={item.name} id={item.id} price={item.price} />;
    });
    return (
      <div>
        <div className="item-box-title">
          <h3>{this.props.label}</h3>
        </div>
        <div className="itemsBox">{itemsBox}</div>
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
)(ItemsBox);
