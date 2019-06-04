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
      messages: this.props.messages,
      newestMessage: '',
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

    this.props.postNewMessage(data, this.props.match.params.id);
    this.setState({ newestMessage: this.state.body });
    // this.props.grabThreadMessages(this.props.match.params.id);
  }

  componentDidMount() {
    const user = this.props.currentUser;
    this.props.grabThreadMessages(this.props.match.params.id);
    // console.log(this.props.currentUser);
    if (document.getElementById('messages-container')) {
      let scroller = document.getElementById('messages-container');
      scroller.scrollTop = scroller.scrollHeight;
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.messages !== prevProps.messages) {
      let scroller = document.getElementById('messages-container');
      scroller.scrollTop = scroller.scrollHeight;
    }
    // this.props.grabUserThreads();
  }

  render() {
    if (!this.props.currentUser) {
      return <Redirect to="/" />;
    } else {
      if (this.props.messages.length === 0) {
        return <div>No messages found2</div>;
      } else {
        // SORT TEST
        function compareValues(key, order = 'asc') {
          return function(a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
              return 0;
            }

            const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
            const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
              comparison = 1;
            } else if (varA < varB) {
              comparison = -1;
            }
            return order == 'desc' ? comparison * -1 : comparison;
          };
        }

        // console.log(this.props.messages.sort(compareValues('id', 'asc')));

        let sortedMessages = this.props.messages.sort(compareValues('id', 'asc'));
        console.log(sortedMessages);
        // SORT TEST ^^
        const messagesBox = sortedMessages.map((message, idx) => {
          return (
            <MessageBox
              // name={thread.name}
              // id={thread.id}
              // price={thread.price}
              id={message.id}
              body={message.body}
              sent_by_user_id={message.sent_by_user_id}
              sent_by_username={message.sent_by_username}
              // imageLink="https://3dexport.com/items/2018/07/11/530458/205933/rigged_cartoon_giraffe_model_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_2172968_o.jpg"
            />
          );
        });

        return (
          <div className="conversation-page">
            <div className="conversation-page-title">{/* <h1>Conversation Page</h1> */}</div>
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
    currentUser: state.userReducer.user,
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
