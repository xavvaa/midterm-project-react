import React from 'react';
import ItemList from './ItemList'; 

const LowStockItems = ({ items, updateItem, removeItem }) => {
  // Filter items that are have quantity <= 5
  const filteredLowStockItems = items.filter(item => item.quantity <= 5);

  return (
    <div className="low-stock-items">
      <h3>Low Stock Items</h3>
      <ItemList items={filteredLowStockItems} updateItem={updateItem} removeItem={removeItem} />
    </div>
  );
};

export default LowStockItems;
