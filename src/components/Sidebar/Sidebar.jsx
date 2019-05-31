import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss';

const Sidebar = (props) => {

  //generate links for items by category
  const createItemCategoryLinks = () => {
    return (
      <div className="category-links">
        <h3>Shop By Category</h3>
        <Link to="/">
          <button>View All</button>
        </Link>
        <Link to="/items/category/apparel">
          <button>Apparel</button>
        </Link>
        <Link to="/items/category/books">
          <button>Books</button>
        </Link>
        <Link to="/items/category/electronics">
          <button>Electronics</button>
        </Link>
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
          <i className="sunLogo" class="fas fa-sun" />
          <Link to="/">Savannah</Link>
        </div>
        <div className="wrap-links">
          <div className="nav-links">
            <Link to="/">
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
    const userLink = `/users/${props.currentUser.id}`;
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
          <Link to="/">
            <button>Messages</button>
          </Link>
        </div>

        <div className="nav-links">
          <Link to="/">
            <button>Settings</button>
          </Link>
        </div>

        <div className="nav-links">
          <Link to="/add-item">
            <button>Add Items</button>
          </Link>
        </div>

        <div className="nav-links">
          <Link to="/edit-item">
            <button>Edit Items</button>
          </Link>
        </div>

        <div className="cat-links">{createItemCategoryLinks()}</div>


          
        </div>

      </div>
    );
  } else {
    const userLink = `/users/${props.currentUser.id}`;
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
          <Link to="/users/all">
            <button>All Users</button>
          </Link>
        </div>

        <div className="nav-links">
          <Link to="/">
            <button>Items</button>
          </Link>
        </div>

        <div className="nav-links">
          <Link to="/">
            <button>Categories</button>
          </Link>
        </div>

        <div className="nav-links">
          <Link to="/">
            <button>Settings</button>
          </Link>
        </div>

        <div className="cat-links">{createItemCategoryLinks()}</div>


        </div>

        
      </div>
    );
  }
};

export default Sidebar;
