import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './AdminUserCard.scss';
import moment from 'moment';

class AdminUserCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      username: '',
      role_id: 3,
      role: '',
      active: '',
      imageURL: '',
      activeSince: '',
    };

    this.roleOptions = this.roleOptions.bind(this);
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
  }

  componentDidMount() {

    let memberSince = moment(new Date(this.props.activeSince)).format('MM/DD/YYYY');

    this.setState((prevState) => ({
      id: this.props.id,
      username: this.props.username,
      role_id: this.props.role_id,
      role: this.props.role,
      imageURL: this.props.image,
      activeSince: memberSince,
    }));

    if (this.props.active) {
      this.setState((prevState) => ({
        active: 'ACTIVE'
      }));
    } else {
      this.setState((prevState) => ({
        active: 'INACTIVE'
      }));
    }


  }

  handleInputOnChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    return this.setState({ [name]: value });
  }

  roleOptions(roleID) {
    if (roleID === 1) {
      return (
        <>
          <select name="role_id" onChange={this.handleInputOnChange}>
            <option value="1">Admin</option>
            <option value="2">Moderator</option>
            <option value="3">User</option>
          </select>
        </>
      );
    } else if (roleID === 2) {
      return (
        <>
          <select name="role_id" onChange={this.handleInputOnChange}>
            <option value="2">Moderator</option>
            <option value="1">Admin</option>
            <option value="3">User</option>
          </select>
        </>
      );
    } else {
      return (
        <>
          <select name="role_id" onChange={this.handleInputOnChange}>
            <option value="3">User</option>
            <option value="2">Moderator</option>
            <option value="1">Admin</option>
          </select>
        </>
      );
    }
  }

  render() {
    return (
      <div className="admin-user-view">
        <div className="admin-user-box-1">
          <img className="img" src={this.state.imageURL} />
        </div>

        <div className="admin-user-box-2">
          <h3>{this.state.username}</h3>
          <p>Member Since:&nbsp;&nbsp;{this.state.activeSince}</p>
          <p>Role:&nbsp;&nbsp;{this.state.role}</p>
          <p>Status:&nbsp;&nbsp;{this.state.active}</p>

          <div className="update-role">
            <form>
              <label for="role" name="role">
                Update Role
              </label><br></br>
              {this.roleOptions(this.props.role_id)}
              <br></br>
              <button>Submit</button>
            </form>
          </div>

          <div className="deactivate">
            <button>Activate / Deactivate</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

AdminUserCard = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminUserCard);

export default AdminUserCard;
