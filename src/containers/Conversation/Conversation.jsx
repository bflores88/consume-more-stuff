import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Conversation.scss';
import { grabThreadMessages } from '../../actions';
import MessageBox from '../MessageBox';

import { postNewMessage } from '../../actions';

class Conversation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      body: '',
    };
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.postMessage = this.postMessage.bind(this);
  }

  handleInputOnChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    console.log(name, value);
    return this.setState({ [name]: value });
  }

  postMessage(e) {
    e.preventDefault();
    const data = {};
    data.body = this.state.body;

    console.log(data);
    // const postEm = (inputData) =>{
    //   return () =>{
    //     return this.props.addItem(inputData)
    //   }
    // }
    this.props.postNewMessage(data, this.props.match.params.id);
    this.props.grabThreadMessages(this.props.match.params.id);
  }

  componentDidMount() {
    const user = this.props.currentUser;
    this.props.grabThreadMessages(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
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

              {/* {threadsBox} */}
              {/* <div>{this.props.threads[0].subject}</div> */}
            </div>
            <div className="input-message-container">
              <form action="">
                <div id="form-div">
                  <textarea onChange={this.handleInputOnChange} name="body" id="message-input" cols="30" rows="10" />
                  <div id="button-container">
                    <button onClick={this.postMessage} id="submit-message-button">
                      Send
                    </button>
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
    postNewMessage: (data, id) => {
      dispatch(postNewMessage(data, id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Conversation);
