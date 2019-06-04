import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Profiles.scss';
import { loadSingleUser } from '../../actions';

class Profiles extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const user = this.props.match.params.id;
    this.props.loadSingleUser(user);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const user = this.props.match.params.id;
      this.props.loadSingleUser(user);
    }
  }

  render() {
    if (!this.props.currentUser) {
      return <Redirect to="/not-authorized" />;
    } else if (this.props.currentUser.role_id !== 1 && parseInt(this.props.match.params.id) !== this.props.currentUser.id) {
      return <Redirect to="/not-authorized" />;
    } else if (this.props.match.params.id !== 'all') {
      if (!this.props.user.username) {
        return (
          <>
            <div>Page Loading...</div>
          </>
        );
      } else {
        console.log(this.props.user);
        const user = {
          username: this.props.user.username,
          name: this.props.user.name,
          email: this.props.user.email,
          // role: this.props.user.roles.roleName,
          image: this.props.user.profile_image_url,
          active: this.props.user.active,
        };

        let status;
        if (user.active) {
          status = 'ACTIVE';
        } else {
          status = 'INACTIVE';
        }

        return (
          <div className="user-profile">
            <div className="user-img">
              <img className="prof-img" src={user.image} alt="user-image" />
            </div>

            <div className="user-details">
              <h2>Username:&nbsp;{user.username}</h2>

              <p className="user-detail">Name:&nbsp;{user.name}</p>
              <p className="user-detail">Email:&nbsp;{user.email}</p>
              <p className="user-detail">Role:&nbsp;{user.role}</p>
              <p className="user-detail">Status:&nbsp;{status}</p>
              <br />
              <div className="profile-button">
                <button>Edit Profile</button>
              </div>
              <br />
              <div className="profile-button">
                <button>Deactivate My Account</button>
              </div>
            </div>
          </div>
        );
      }
    } else {
      return <h1>Users Page</h1>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer.user,
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSingleUser: (user) => dispatch(loadSingleUser(user)),
  };
};

Profiles = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profiles);

export default Profiles;
