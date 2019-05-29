import React, { Component } from 'react';

import { connect } from 'react-redux';
import './Item.scss';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {}
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
