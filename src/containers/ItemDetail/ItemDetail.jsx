import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadSpecificItem } from '../../actions';

class ItemsDetail extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
    };
  }

  componentDidMount() {
    this.props.getSpecificItem(1).then((response) => {
      console.log(response.payload.name);
      return this.setState({
        name: response.payload.name
      })
    });
  }

  render() {
    console.log(this.props.item);

    return <div>{this.state.name}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    item: state.item,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSpecificItem: (item) => dispatch(loadSpecificItem(item)),
  };
};

ItemsDetail = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemsDetail);

export default ItemsDetail;
