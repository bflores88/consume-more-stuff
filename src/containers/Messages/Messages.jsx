import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Messages.scss';

class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    if (!this.props.currentUser) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="message-page">
          <h1>Messages Page</h1>
        </div>
      );
    }
  }

  componentDidMount() {
    const user = this.props.currentUser;
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.currentUser);
    if (this.props.currentUser !== prevProps.currentUser) {
      const user = this.props.currentUser;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.itemReducer.currentUser,
  };
};

export default connect(mapStateToProps)(Messages);
