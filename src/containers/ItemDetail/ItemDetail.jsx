import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadSpecificItem } from '../../actions';

class ItemsDetail extends Component {
  constructor(props) {
    super(props);
    
    // this.state = {
    //   name: '',
    // };
  }

  componentDidMount() {
    return this.props.loadSpecificItem(6)
    // .then((response) => {
    //   return this.setState({
    //     name: response.payload.name,
    //     description: response.payload.description,

    //   })
    // });
  }

  render() {
    console.log('12312312312312',this.props.item)
    return <div>
    {this.props.item.name}
    {this.props.item.description}
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    item: state.itemReducer.item,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSpecificItem: (item) => dispatch(loadSpecificItem(item)),
  };
};

ItemsDetail = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemsDetail);

export default ItemsDetail;
