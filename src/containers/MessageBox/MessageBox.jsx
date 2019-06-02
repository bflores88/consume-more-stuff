import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import './MessageBox.scss';

class MessageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { id, body, sent_by } = this.props;
    const threadID = id;
    // const redirectTo = `/conversation/${threadID}`;
    // const redirectLink = `/conversation/${threadID}`;
    if (sent_by === this.props.currentUser.id) {
      return (
        <div className="outer-message-box-user">
          <div className="message-box" className="user-message">
            {/* <h4>User: {sent_by}</h4> */}
            <p className="sent_by">User: {sent_by}</p>
            <div className="message-body">{body}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="outer-message-box-other">
          <div className="message-box" className="other-message">
            <p className="sent_by">User: {sent_by}</p>
            <div className="message-body">{body}</div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.authentication.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageBox);
