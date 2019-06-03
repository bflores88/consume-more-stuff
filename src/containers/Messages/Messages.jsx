import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Messages.scss';
import { grabUserThreads } from '../../actions';
import ThreadBox from '../ThreadBox';

class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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
    // this.props.grabUserThreads();
  }

  render() {
    if (!this.props.currentUser) {
      return <Redirect to="/" />;
    } else {
      if (this.props.threads.length === 0) {
        return <div>olollo</div>;
      } else {
        console.log('threads', this.props.threads);

        const threadsBox = this.props.threads.map((thread, idx) => {
          return (
            <ThreadBox
              // name={thread.name}
              // id={thread.id}
              // price={thread.price}
              id={thread.id}
              subject={thread.subject}
              user_list={thread.user_list}
              // imageLink="https://3dexport.com/items/2018/07/11/530458/205933/rigged_cartoon_giraffe_model_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_2172968_o.jpg"
            />
          );
        });

        return (
          <div className="message-page">
            <div className="message-page-title">
              <h1>Messages Page</h1>
            </div>
            <div className="threads-container">
              {threadsBox}
              {/* <div>{this.props.threads[0].subject}</div> */}
            </div>
          </div>
        );
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer.user,
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
