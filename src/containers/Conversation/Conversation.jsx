import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Conversation.scss';
import { grabThreadMessages } from '../../actions';
import MessageBox from '../MessageBox';

class Conversation extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const user = this.props.currentUser;
    this.props.grabThreadMessages(this.props.match.params.id);
    return console.log(this.props.threads);
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.currentUser);
    if (this.props.currentUser !== prevProps.currentUser) {
      const user = this.props.currentUser;
    }
    // this.props.grabUserThreads();
    let scroller = document.getElementById('messages-container');
    scroller.scrollTop = scroller.scrollHeight;
  }

  render() {
    if (!this.props.currentUser) {
      return <Redirect to="/" />;
    } else {
      if (this.props.messages.length === 0) {
        return <div>olollo</div>;
      } else {
        console.log('messages', this.props.messages);

        const messagesBox = this.props.messages.map((message, idx) => {
          return (
            <MessageBox
              // name={thread.name}
              // id={thread.id}
              // price={thread.price}
              id={message.id}
              body={message.body}
              sent_by={message.sent_by}
              // imageLink="https://3dexport.com/items/2018/07/11/530458/205933/rigged_cartoon_giraffe_model_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_2172968_o.jpg"
            />
          );
        });

        return (
          <div className="conversation-page">
            <div className="conversation-page-title">
              <h1>Conversation Page</h1>
            </div>
            <div className="messages-container" id="messages-container">
              {messagesBox}
              {messagesBox}
              {messagesBox}
              {messagesBox}
              {messagesBox}
              {messagesBox}
              {messagesBox}
              {messagesBox}
              {messagesBox}
              {/* {threadsBox} */}
              {/* <div>{this.props.threads[0].subject}</div> */}
            </div>
            <div className="input-message-container">
              <form action="">
                <div id="form-div">
                  <textarea name="" id="message-input" cols="30" rows="10" />
                  <div id="button-container">
                    <button id="submit-message-button">Send</button>
                  </div>
                </div>
              </form>
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
    messages: state.itemReducer.messages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    grabThreadMessages: (id) => {
      dispatch(grabThreadMessages(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Conversation);
