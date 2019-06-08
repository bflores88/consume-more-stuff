import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import './ThreadBox.scss';

class ThreadBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { id, subject, user_list } = this.props;
    const threadID = id;
    // const redirectTo = `/conversation/${threadID}`;
    const redirectLink = `/conversation/${threadID}`;

    return (
      <Link to={redirectLink}>
        <div className="thread-box">
          <h3>{subject}</h3>

          <p>{id}</p>
          <h4>Users: {user_list}</h4>
        </div>
      </Link>
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
)(ThreadBox);
