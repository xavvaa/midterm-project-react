import React, { useState } from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faExclamationTriangle, faPlusCircle, faMagnifyingGlass, faDisplay } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ onSelectOption }) => {
  // State to manage dropdown visibility
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  // Function to hide dropdown when the cursor leaves the sidebar
  const hideDropdown = () => {
    setDropdownVisible(false);
  };

  return (
    <div className="sidebar" onMouseLeave={hideDropdown}>
      <div className="sidebar-content">
        <ul className="sidebar-list">
          <li onClick={() => onSelectOption('addItem')}>
            <FontAwesomeIcon icon={faPlusCircle} className="icon" />
            <span className="sidebar-text">Add New Item</span>
          </li>
          
          <li onClick={() => onSelectOption('allItems')}>
            <FontAwesomeIcon icon={faBox} className="icon" />
            <span className="sidebar-text">All Items</span>
          </li>

          {/* Dropdown Menu */}
          <li onClick={toggleDropdown} className="dropdown-toggle">
            <FontAwesomeIcon icon={faDisplay} className="icon" />
            <span className="sidebar-text">Display</span>
          </li>
          {isDropdownVisible && (
            <ul className="dropdown-list">
              <li onClick={() => onSelectOption('byCategory')}>
                <FontAwesomeIcon icon={faPlusCircle} className="icon" />
                <span className="sidebar-text">By Category</span>
              </li>
              <li onClick={() => onSelectOption('lowStock')}>
                <FontAwesomeIcon icon={faExclamationTriangle} className="icon" />
                <span className="sidebar-text">By Low Stock Items</span>
              </li>
            </ul>
          )}
          
          <li onClick={() => onSelectOption('searchItem')}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
          <span className="sidebar-text">Search Item</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;