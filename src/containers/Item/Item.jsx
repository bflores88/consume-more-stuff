import React, { Component } from 'react';

import { connect } from 'react-redux';
import './Item.scss';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { name } = this.props;
    return (
      <div>
        <div className="itemName">{name}</div>
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
)(Item);
