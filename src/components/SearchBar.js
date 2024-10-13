// SearchBar.js
import React, { useState } from 'react';
import './style.css'; // Import any necessary styles

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    onSearch(query); // Call the onSearch function passed from App.js
    setQuery(''); // Clear the input after search
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Item ID"
        value={query}
        onChange={handleChange}
        required // Ensure input is required
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
