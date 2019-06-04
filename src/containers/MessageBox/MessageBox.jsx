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
    const { id, body, sent_by_user_id, sent_by_username } = this.props;
    const threadID = id;
    // console.log('sent_by', sent_by);
    // const redirectTo = `/conversation/${threadID}`;
    // const redirectLink = `/conversation/${threadID}`;
    if (sent_by_user_id === this.props.currentUser.id) {
      return (
        <div className="outer-message-box-user">
          <div className="message-box" className="user-message">
            {/* <h4>User: {sent_by}</h4> */}
            <p className="sent_by">{sent_by_username}</p>
            <div className="message-body">{body}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="outer-message-box-other">
          <div className="message-box" className="other-message">
            <p className="sent_by">{sent_by_username}</p>
            <div className="message-body">{body}</div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageBox);
