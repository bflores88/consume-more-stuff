import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadSpecificItem } from '../../actions';

const ItemDetail = (props) => {

  console.log(props);

  console.log(props.match.params);

  const { category } = props.match.params;

  console.log(category);

  return <div>Item Detail Page</div>;


};

// class ItemDetail extends Component {
//   constructor(props) {
//     super(props);
    
//     this.state = {
//       name: ''
//     };
//   }

//   componentDidMount() {
//     console.log(this.props)
//     return this.props.loadSpecificItem(6)
//     // .then((response) => {
//     //   return this.setState({
//     //     name: response.payload.name,
//     //     description: response.payload.description,

//     //   })
//     // });
//   }

//   render() {
//     console.log('12312312312312',this.props.item)
//     return <div>
//     {this.props.item.name}
//       {this.props.item.description}
//       <h1>Item Detail Page</h1>
//     </div>;
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     item: state.itemReducer.item,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     loadSpecificItem: (item) => dispatch(loadSpecificItem(item)),
//   };
// };

// ItemDetail = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(ItemDetail);

export default ItemDetail;
