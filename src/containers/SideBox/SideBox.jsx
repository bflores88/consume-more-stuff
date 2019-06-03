import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SideBox.scss';
import Sidebar from '../../components/Sidebar/Sidebar';

class SideBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="side-box">
        <Sidebar currentUser={this.props.currentUser} />
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  console.log(state.userReducer.user);
  return {
    
    currentUser: state.userReducer.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

SideBox = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideBox)

export default SideBox;
