import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './EditProfile.scss';
import { connect } from 'react-redux';
import { updateUser } from '../../actions';

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: ''
    };

    this.handelNameChange = this.handelNameChange.bind(this);
    this.handelEmailChange = this.handelEmailChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
  }

  componentDidMount() {
    this.setState((prevState) => ({
      name: this.props.name,
      email: this.props.email,
    }));
  }

  handelNameChange(e) {
    const { value } = e.target;
    this.setState((prevState) => ({
      name: value,
    }));
  }

  handelEmailChange(e) {
    const { value } = e.target;
    this.setState((prevState) => ({
      email: value,
    }));
  }

  handleEditSubmit(e) {
    e.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email
    }

    this.props.updateUser(data).then((result) => {
      this.props.success(e)
    })
 
  }

  handleCancel(e) {
    e.preventDefault();
    this.setState((prevState) => ({
      name: this.props.name,
      email: this.props.email,
    }));
    return this.props.close(e);
  }

  render() {
    const deactivateUrl = `/profiles/${this.props.id}/deactivate`;
    return (
      <div className="edit-profile-div">
        <h2>Update Your Profile</h2>
        <form>
          <div className="input-div">
            <label>Update Name:</label>
            <input
              type="text"
              name="name"
              className="input"
              value={this.state.name}
              onChange={this.handelNameChange}
              placeholder={this.state.name}
            />
          </div>

          <div className="input-div">
            <label>Update Email:</label>
            <input
              type="text"
              name="email"
              className="input"
              value={this.state.email}
              onChange={this.handelEmailChange}
              placeholder={this.state.email}
            />
          </div>

          <div className="input-div">
            <button type="submit" onClick={this.handleEditSubmit}>Submit</button>
          </div>
        </form>

        <div className="other-edit-div">
          <button><Link to={deactivateUrl}>Deactivate My Account</Link></button>
        </div>

        <div className="other-edit-div">
          <button onClick={this.handleCancel}>Cancel</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    updatedUser: state.userReducer.updatedUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (data) => dispatch(updateUser(data)),
  };
};

EditProfile = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfile);

export default EditProfile;
