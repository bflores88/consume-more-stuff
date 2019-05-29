import React, { Component } from 'react';
import Item from '../Item';

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

  render() {
    const input = this.state.input;
    const itemsBox = this.state.items.map((item, idx) => {
      return <Item name={item.name} />;
    });
    return <>{itemsBox}</>;
  }
}

export default ItemsBox;
