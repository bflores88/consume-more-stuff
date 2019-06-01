import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Messages.scss';
import { grabUserThreads } from '../../actions';

class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    if (!this.props.currentUser) {
      return <Redirect to="/" />;
    } else {
      if (this.props.threads.length === 0) {
        return <div>olollo</div>;
      } else {
        console.log('threads', this.props.threads);
        return (
          <div className="message-page">
            <div className="message-page-title">
              <h1>Messages Page</h1>
            </div>
            <div className="threads-container">
              <div>test box</div>
              <div>{this.props.threads[0].subject}</div>
            </div>
          </div>
        );
      }
    }
  }

  componentDidMount() {
    const user = this.props.currentUser;
    this.props.grabUserThreads();
    return console.log(this.props.threads);
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
    threads: state.itemReducer.threads,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    grabUserThreads: () => {
      dispatch(grabUserThreads());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Messages);
