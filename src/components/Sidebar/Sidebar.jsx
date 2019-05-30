import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss';

const Sidebar = (props) => {

  //need props for isLoggedIn and role
  const { isLoggedIn, role } = props;

  //generate links for items by category
  const createItemCategoryLinks = () => {
    <div className="category-links">
      <h3>Shop By Category</h3>
      <Link to="/items/category/all">
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
  };

  //conditional statement to show if isLoggedIn is true or false (logged in or not) AND check the role

  //first if statement is for non-users
  //second if statement is for admin and mods
  //else is for users

  if (!isLoggedIn) {
    return (
      <div className="public-nav">
        <div className="logo">
          {/* insert logo here */}
          <Link to="/">
            SAVANNAH
          </Link>
        </div>

        <div className="nav-links">
          <Link to="/home">
            <button>Home</button>
          </Link>
        </div>

        <div className="cat-links">
          {createItemCategoryLinks()}
        </div>
      </div>
    );
  } else if (isLoggedIn && role !== "user") {
    return (
      <div className="admin-nav">
        <div className="logo">
          {/* insert logo here */}
          <Link to="/">
            SAVANNAH
          </Link>
        </div>

        <div className="nav-links">
          <Link to="/admin/items">
            Items
          </Link>
        </div>

        <div className="nav-links">
          <Link to="/admin/categories">
            Categories
          </Link>
        </div>

        <div className="nav-links">
          <Link to="/admin/settings">
            Settings
          </Link>
        </div>

        <div className="cat-links">
          {createItemCategoryLinks()}
        </div>

      </div>
    );
  } else {
    return (
      <div className="user-nav">
        <div className="logo">
          {/* insert logo here */}
          <Link to="/">
            SAVANNAH
          </Link>
        </div>

        <div className="nav-links">
          <Link to="/home">
            <button>Home</button>
          </Link>
        </div>

        <div className="nav-links">
          <Link to="/users/messages">
            <button>Messages</button>
          </Link>
        </div>

        <div className="nav-links">
          <Link to="/users/settings">
            <button>Settings</button>
          </Link>
        </div>

        <div className="nav-links">
          <Link to="/users/items/new">
            <button>Post Items</button>
          </Link>
        </div>

        <div className="nav-links">
          <Link to="/users/items">
            <button>Edit Items</button>
          </Link>
        </div>

        <div className="cat-links">
          {createItemCategoryLinks()}
        </div>

      </div>
    )
  }

}

export default Sidebar;