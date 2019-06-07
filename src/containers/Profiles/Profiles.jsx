import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Profiles.scss';
import { loadSingleUser } from '../../actions';
import moment from 'moment';
import EditProfile from '../../components/EditProfile';

class Profiles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userProfileDisplay: 'display-div',
      editProfileDisplay: 'hide-div',
      editSuccessDisplay: 'hide-div',
    };

    this.handleClickToEdit = this.handleClickToEdit.bind(this);
    this.handleClickToEdit = this.handleClickToEdit.bind(this);
    this.editSuccess = this.editSuccess.bind(this);
  }

  componentDidMount() {
    console.log('Profiles ', this.props.user);
    this.props.loadSingleUser(this.props.user.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const user = this.props.match.params.id;
      this.props.loadSingleUser(user);
    }
  }

  handleClickToEdit(e) {
    e.preventDefault();

    if (this.state.userProfileDisplay === 'hide-div') {
      this.setState((prevState) => ({
        userProfileDisplay: 'display-div',
        editProfileDisplay: 'hide-div',
        editSuccessDisplay: 'hide-div'
      }));
    } else {
      this.setState((prevState) => ({
        userProfileDisplay: 'hide-div',
        editProfileDisplay: 'display-div',
      }));
    }
  }

  editSuccess(e) {
    e.preventDefault();

    this.setState((prevState) => ({
      userProfileDisplay: 'display-div',
      editProfileDisplay: 'hide-div',
      editSuccessDisplay: 'display-div',
    }));
    const user = this.props.match.params.id;
    this.props.loadSingleUser(user);
  }

  render() {
    if (!this.props.user) {
      return <Redirect to="/not-authorized" />;
    } else if (

      this.props.user.role_id !== 1 &&
      parseInt(this.props.match.params.id) !== this.props.user.id

    ) {
      return <Redirect to="/not-authorized" />;
    } else if (this.props.match.params.id !== 'all') {
      if (!this.props.user.roles) {
        return (
          <>
            <div>Page Loading...</div>
          </>
        );
      } else {
        console.log(this.props.user);
        const user = {
          id: this.props.user.id,
          username: this.props.user.username,
          name: this.props.user.name,
          email: this.props.user.email,

          image: this.props.user.profile_image_url,

          role: this.props.user.roles.role_name,

          active: this.props.user.active,
          memberSince: this.props.user.created_at,
        };

        let memberSince = moment(new Date(user.memberSince)).format('MMM DD YYYY');

        let status;
        if (user.active) {
          status = 'ACTIVE';
        } else {
          status = 'INACTIVE';
        }

        const altDetail = `image-user${user.id}`;

        return (
          <div className="user-profile">
            <div className="user-img">
              <img className="prof-img" src={user.image} alt={altDetail} />
            </div>

            <div className="user-details">
              <div className={this.state.userProfileDisplay}>
                <div className={this.state.editSuccessDisplay}>
                  <h2>Successfully Updated Profile!</h2>
                </div>

                <h2>Username:&nbsp;{user.username}</h2>

                <p className="user-detail">Name:&nbsp;{user.name}</p>
                <p className="user-detail">Email:&nbsp;{user.email}</p>
                <p className="user-detail">Role:&nbsp;{user.role}</p>
                <p className="user-detail">Status:&nbsp;{status}</p>
                <p className="user-detail">Member Since:&nbsp;{memberSince}</p>
                <br />
                <div className="profile-button">
                  <button onClick={this.handleClickToEdit}>Edit Profile</button>
                </div>
              </div>

              <div className={this.state.editProfileDisplay}>
                <EditProfile
                  close={this.handleClickToEdit}
                  name={user.name}
                  email={user.email}
                  success={this.editSuccess}
                  id={user.id}
                />
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
