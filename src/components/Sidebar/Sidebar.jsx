import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss';
import CategoryLinks from '../CategoryLinks';

const Sidebar = (props) => {
  //generate links for items by category
  const createItemCategoryLinks = () => {
    return (
      <div className="category-links">
        <h4>Shop By Category</h4>
        <Link to="/">
          <button>View All</button>
        </Link>
        <CategoryLinks />
      </div>
    );
  };

  //conditional statement to show if isLoggedIn is true or false (logged in or not) AND check the role

  //first if statement is for non-users
  //second if is for users
  //else is for admins and moderators

  if (!props.currentUser) {
    return (
      <div className="public-nav">
        <div className="logo">
          <i className="sunLogo" className="fas fa-sun" />
          <Link to="/">Savannah</Link>
        </div>
        <div className="wrap-links">
          <div className="nav-links">
            <Link to="/register">
              <button>Register</button>
            </Link>
          </div>

          <div className="nav-links">
            <Link to="/">
              <button>Home</button>
            </Link>
          </div>
        </div>
        <div className="cat-links">{createItemCategoryLinks()}</div>
      </div>
    );
  } else if (props.currentUser.role_id === 3) {
    const userLink = `/profiles/${props.currentUser.id}`;
    const userItemsLink = `/users/${props.currentUser.id}/items`;
    // const messageLink = `/messages/${props.currentUser.id}`;
    return (
      <div className="user-nav">
        <div className="logo">
          <i className="sunLogo" class="fas fa-sun" />
          <Link to="/">SAVANNAH</Link>
        </div>

        <div className="wrap-links">
          <div className="nav-links">
            <Link to="/">
              <button>Home</button>
            </Link>
          </div>

          <div className="nav-links">
            <Link to={userLink}>
              <button>My Profile</button>
            </Link>
          </div>

          <div className="nav-links">
            <Link to="/profiles/settings">
              <button>Settings</button>
            </Link>
          </div>

          <div className="nav-links">
            <Link to="/messages">
              <button>Messages</button>
            </Link>
          </div>

          <div className="nav-links">
            <Link to={userItemsLink}>
              <button>My Items</button>
            </Link>
          </div>

          <div className="nav-links">
            <Link to="/add-item">
              <button>Add Items</button>
            </Link>
          </div>

          <div className="cat-links">{createItemCategoryLinks()}</div>
        </div>
      </div>
    );
  } else {
    const userLink = `/profiles/${props.currentUser.id}`;
    const userItemsLink = `/users/${props.currentUser.id}/items`;
    return (
      <div className="admin-nav">
        <div className="logo">
          <i className="sunLogo" class="fas fa-sun" />
          <Link to="/">SAVANNAH</Link>
        </div>

        <div className="wrap-links">
          <div className="nav-links">
            <Link to={userLink}>
              <button>My Profile</button>
            </Link>
          </div>

          <div className="nav-links">
            <Link to="/profiles/settings">
              <button>Settings</button>
            </Link>
          </div>

          <div className="nav-links">
            <Link to="/admin/users">
              <button>All Users</button>
            </Link>
          </div>

          <div className="nav-links">
            <Link to="/items/all">
              <button>All Items</button>
            </Link>
          </div>

          <div className="nav-links">
            <Link to="/">
              <button>Categories</button>
            </Link>
          </div>

          <br></br>

          <div className="nav-links">
            <Link to="/messages">
              <button>Messages</button>
            </Link>
          </div>

          <div className="nav-links">
            <Link to={userItemsLink}>
              <button>My Items</button>
            </Link>
          </div>

          <div className="nav-links">
            <Link to="/add-item">
              <button>Add Items</button>
            </Link>
          </div>

          <div className="cat-links">{createItemCategoryLinks()}</div>
        </div>
      </div>
    );
  }
};

export default Sidebar;
