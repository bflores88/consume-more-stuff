import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Messages.scss';
import { grabUserThreads } from '../../actions';
import ThreadBox from '../ThreadBox';
import { Link } from 'react-router-dom';

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
              <h1>Your Messages</h1>
            </div>
            <div className="threads-container">
              <Link to={'/add-thread'}>
                <div className="add-thread-box">
                  <h3>Create new thread</h3>

                  {/* <p>{id}</p>
                  <h4>Users: {user_list}</h4> */}
                </div>
              </Link>
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
