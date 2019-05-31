import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadSpecificItem } from '../../actions';


class ItemDetail extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
    };
  }

  componentDidMount() {
    return this.props.loadSpecificItem(this.props.match.params.id)
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      return this.props.loadSpecificItem(this.props.match.params.id)
    }
  }

  render() {
    console.log('12312312312312',this.props.item)
    return <div>
    {this.props.item.name}
      {this.props.item.description}
      <h1>Item Detail Page</h1>
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

ItemDetail = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemDetail);

export default ItemDetail;
