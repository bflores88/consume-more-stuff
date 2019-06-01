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
    console.log('********',this.props.item)
    return (
      <div className="item-detail">
        <div clasName="detail-box">
          <div className="detail-image">
            
          </div>

        </div>

   
      </div>
    )
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
