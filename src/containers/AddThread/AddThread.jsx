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

    // console.log(name, value);
    return this.setState({ [name]: value });
  }

  addNewThread(e) {
    e.preventDefault();
    const data = {};
    data.subject = this.state.subject;
    data.body = this.state.body;
    data.read_only = false;
    data.userList = [3];
    return this.props.addThread(data);
  }

  componentDidMount() {
    // return console.log('94it93it349ti3', this.props.newestItem);
  }

  render() {
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
