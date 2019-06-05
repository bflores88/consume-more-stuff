import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './AdminUserCard.scss';
import moment from 'moment';
import { adminUserEdit } from '../../actions';

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
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
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
        active: 'ACTIVE',
      }));
    } else {
      this.setState((prevState) => ({
        active: 'INACTIVE',
      }));
    }
  }

  componentDidUpdate(prevProps) {}

  handleInputOnChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    return this.setState({ [name]: value });
  }

  handleRoleChange(e) {
    e.preventDefault();
    const data = {
      id: this.state.id,
      role_id: this.state.role_id,
    };

    if (data.role_id === '1') {
      this.setState({ role: 'Admin' });
    } else if (data.role_id === '2') {
      this.setState({ role: 'Moderator' });
    } else {
      this.setState({ role: 'User' });
    }

    return this.props.adminUserEdit(data);
  }

  handleStatusChange(e) {
    e.preventDefault();
    let data;
    if (this.state.active === 'ACTIVE') {
      data = {
        id: this.state.id,
        active: false,
      };

      this.setState({ active: 'INACTIVE' });
    } else {
      data = {
        id: this.state.id,
        active: true,
      };

      this.setState({ active: 'ACTIVE' });
    }

    this.props.adminUserEdit(data);
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
    const userLink = `/users/${this.state.id}/items`
    return (
      <div className="admin-user-view">
        <div className="admin-user-box-1">
          <img className="img" src={this.state.imageURL} />
        </div>

        <div className="admin-user-box-2">
          <Link to={userLink}><h3>{this.state.username}</h3></Link>
          <p>Member Since:&nbsp;&nbsp;{this.state.activeSince}</p>
          <p>Role:&nbsp;&nbsp;{this.state.role}</p>
          <p>Status:&nbsp;&nbsp;{this.state.active}</p>

          <div className="update-role">
            <form>
              <label for="role" name="role">
                Update Role
              </label>
              <br />
              {this.roleOptions(this.props.role_id)}
              <br />
              <button type="submit" onClick={this.handleRoleChange}>
                Submit
              </button>
            </form>
          </div>

          <div className="deactivate">
            <button onClick={this.handleStatusChange}>Activate / Deactivate</button>
          </div>
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
    adminUserEdit: (data) => dispatch(adminUserEdit(data)),
  };
};

AdminUserCard = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminUserCard);

export default AdminUserCard;
