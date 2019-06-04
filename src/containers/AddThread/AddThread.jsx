import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AddThread.scss';
import { addThread } from '../../actions';

import AddItemImage from '../AddItemImage';

class AddThread extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: '',
      body: '',
      userList: [],
    };
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.addNewThread = this.addNewThread.bind(this);
  }

  handleInputOnChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    if (name === 'addUser') {
      let userListArray = this.state.userList;
      userListArray.push(parseInt(value));
      console.log(userListArray);
      return this.setState({ userList: userListArray });
    }
    return this.setState({ [name]: value });
  }

  addNewThread(e) {
    e.preventDefault();
    const data = {};
    data.subject = this.state.subject;
    data.body = this.state.body;
    data.read_only = false;
    data.userList = this.state.userList;
    return this.props.addThread(data);
  }

  componentDidMount() {
    // return console.log('94it93it349ti3', this.props.newestItem);
  }

  render() {
    let userInputs = this.state.userList.map((user, idx) => {
      return (
        <div className="input-div">
          <label className="input-label" htmlFor="addUser">
            Add User to Thread:
          </label>
          <input
            className="body-input"
            className="input"
            type="number"
            name="addUser"
            placeholder="Add User"
            value={this.state.userList[idx + 1]}
            onChange={this.handleInputOnChange}
            required
          />
        </div>
      );
    });

    return (
      <div className="add-thread-page">
        <h1>Add Thread Page</h1>
        <div className="add-thread-form-box">
          <form className="add-thread-form" action="">
            <div />
            <div className="input-div">
              <div>
                <label className="input-label" htmlFor="name">
                  Thread Subject:
                </label>
                <input
                  className="name-input"
                  className="input"
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={this.state.name}
                  onChange={this.handleInputOnChange}
                  required
                />
              </div>
            </div>
            <div className="input-div">
              <label className="input-label" htmlFor="body">
                Message Body:
              </label>
              <input
                className="body-input"
                className="input"
                type="text"
                name="body"
                placeholder="Message Body"
                value={this.state.body}
                onChange={this.handleInputOnChange}
                required
              />
            </div>

            <div className="input-div">
              <label className="input-label" htmlFor="addUser">
                Add User to Thread:
              </label>
              <input
                className="body-input"
                className="input"
                type="number"
                name="addUser"
                placeholder="Add User"
                value={this.state.userList[0]}
                onChange={this.handleInputOnChange}
                required
              />
            </div>
            {userInputs}
            <button onClick={this.addNewThread}>Create Thread</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    images: state.itemReducer.images,
    currentUser: state.itemReducer.currentUser,
    newestItem: state.itemReducer.newestItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addThread: (data) => {
      dispatch(addThread(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddThread);
