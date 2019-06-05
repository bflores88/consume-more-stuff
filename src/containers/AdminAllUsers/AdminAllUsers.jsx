import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './AdminAllUsers.scss';
import AdminUserCard from '../../components/AdminUserCard';
import { grabAllUsers } from '../../actions';

class AdminAllUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    return this.props.grabAllUsers();
  }

  componentDidUpdate(prevProps) {
    
  }

  render() {
    if (!this.props.user) {
      return <Redirect to="/not-authorized" />;
    } else if (this.props.user.role_id !== 1) {
      return <Redirect to="/not-authorized" />;
    } else {

      const userBoxes = this.props.userList.map((user, idx) => {
        return (
          <AdminUserCard
            id={user.id}
            username={user.username}
            role_id={user.role_id}
            role={user.roles.role_name}
            active={user.active}
            image={user.profile_image_url}
            activeSince={user.created_at}
          />
        );
      });
      return (
        <>
          <div className="admin-all-users">
            <h1>All Users</h1>
            <div className="user-card-container">{userBoxes}</div>
          </div>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    userList: state.itemReducer.userList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    grabAllUsers: () => dispatch(grabAllUsers()),
  };
};

AdminAllUsers = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminAllUsers);

export default AdminAllUsers;
