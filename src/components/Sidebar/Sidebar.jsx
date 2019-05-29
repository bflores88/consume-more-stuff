import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss';

const Sidebar = (props) => {

  //need props for currentUser and role

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

  //conditional statement to show if currentUser is true or false (logged in or note) AND check the role
}

export default Sidebar;