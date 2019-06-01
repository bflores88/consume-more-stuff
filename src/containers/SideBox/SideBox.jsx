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
    const user = this.props.currentUser;
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentUser !== prevProps.currentUser) {
      const user = this.props.currentUser;
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
