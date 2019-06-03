import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class EditItemsDiv extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  //take in itemID AND take in status

  componentDidMount() {
    if (this.props.currentUser) {
      const thisUser = this.props.currentUser.id;
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentUser !== prevProps.currentUser) {
      const thisUser = this.props.currentUser.id;
    }
  }

  render() {
    const itemID = this.props.id;
    const url = `/edit-items/${itemID}`;

      return (
        <div className="edit-buttons">
          <button><Link to={url}>Edit Item</Link></button>
        </div>
      );

  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.itemReducer.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

EditItemsDiv = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditItemsDiv);

export default EditItemsDiv;
