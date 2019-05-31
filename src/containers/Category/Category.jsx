import React, { Component } from 'react';
import './Category.scss';

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const category = this.props.match.params.category;
    console.log(category);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.category !== prevProps.match.params.category) {
      const category = this.props.match.params.category;

      console.log(category);
    }
  }

  render() {
    return (
      <>
        <h1>Category Page</h1>
        <p>View items for sale by specific category</p>
      </>
    );
  }
}


export default Category;
