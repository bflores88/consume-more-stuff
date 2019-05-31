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

  componentDidMount() {
    // console.log(this.props.currentUser.id)
    const user = this.props.currentUser;
    console.log(user);
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.currentUser)
    if (this.props.currentUser !== prevProps.currentUser) {
      const user = this.props.currentUser;

      console.log(user);
    }
  }

}



const mapStateToProps = (state) => {
  return {
    currentUser: state.itemReducer.currentUser
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
