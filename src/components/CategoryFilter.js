import React, { useState } from 'react';
import ItemList from './ItemList'; // Assuming you have this component

const CategoryFilter = ({ items, updateItem, removeItem }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredItems = selectedCategory === 'All' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  return (
    <div className="category-filter">
      <h3>Filter Items by Category</h3>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="All">All</option>
        <option value="Clothing">Clothing</option>
        <option value="Electronics">Electronics</option>
        <option value="Entertainment">Entertainment</option>
      </select>
      <ItemList items={filteredItems} updateItem={updateItem} removeItem={removeItem} />
    </div>
  );
};

export default CategoryFilter;
