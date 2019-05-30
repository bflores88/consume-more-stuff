import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss';

const Sidebar = (props) => {
  //need props for isLoggedIn and role
  const { isLoggedIn, roleID } = props;

  //generate links for items by category
  const createItemCategoryLinks = () => {
    return (
      <div className="category-links">
      <h3>Shop By Category</h3>
      <Link to="/">
        <button>View All</button>
      </Link>
      <Link to="/">
        <button>Apparel</button>
      </Link>
      <Link to="/">
        <button>Books</button>
      </Link>
      <Link to="/">
        <button>Electronics</button>
      </Link>
    </div>

    )
  };

  //conditional statement to show if isLoggedIn is true or false (logged in or not) AND check the role

  //first if statement is for non-users
  //second if is for users
  //else is for admins and moderators

  if (!isLoggedIn) {
    return (
      <div className="public-nav">
        <div className="logo">
        <i className="sunLogo" class="fas fa-sun" />
          <Link to="/">Savannah</Link>
        </div>

        <div className="nav-links">
          <Link to="/">
            <button>Home</button>
          </Link>
        </div>

        <div className="cat-links">{createItemCategoryLinks()}</div>
      </div>
    );
  } else if (isLoggedIn && roleID === '3') {
    return (
      <div className="user-nav">
        <div className="logo">
        <i className="sunLogo" class="fas fa-sun" />
          <Link to="/">SAVANNAH</Link>
        </div>

        <div className="nav-links">
          <Link to="/">
            <button>Home</button>
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
          <Link to="/">
            <button>Add Items</button>
          </Link>
        </div>

        <div className="nav-links">
          <Link to="/">
            <button>Edit Items</button>
          </Link>
        </div>

        <div className="cat-links">{createItemCategoryLinks()}</div>
      </div>
    );
  } else {
    return (
      <div className="admin-nav">
        <div className="logo">
        <i className="sunLogo" class="fas fa-sun" />
          <Link to="/">SAVANNAH</Link>
        </div>

        <div className="nav-links">
          <Link to="/">Items</Link>
        </div>

        <div className="nav-links">
          <Link to="/">Categories</Link>
        </div>

        <div className="nav-links">
          <Link to="/">Settings</Link>
        </div>

        <div className="cat-links">{createItemCategoryLinks()}</div>
      </div>
    );
  }
};

export default Sidebar;
