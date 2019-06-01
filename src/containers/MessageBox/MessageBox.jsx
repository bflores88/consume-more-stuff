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

    return (
      <div className="thread-box">
        {/* <h3>{}</h3> */}

        <h3>{body}</h3>
        <h4>User: {sent_by}</h4>
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
)(MessageBox);
