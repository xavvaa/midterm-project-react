import React, { useState } from 'react';
import './App.css'; 
import Sidebar from './components/Sidebar'; 
import AddItem from './components/AddItem';
import ItemList from './components/ItemList';
import LowStockItems from './components/LowStockItems'; 
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter'; 

const App = () => {
  const [items, setItems] = useState([]);
  const [selectedOption, setSelectedOption] = useState('allItems');
  const [searchResults, setSearchResults] = useState([]); 
  const [errorMessage, setErrorMessage] = useState(''); 

  const addItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const updateItem = (id, updatedItem) => {
    setItems(items.map((item) => (item.id === id ? updatedItem : item)));
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    // Reset search and error on option change
    if (option !== 'searchItem') {
      setSearchResults([]);
      setErrorMessage('');
    }
  };

  // Search function
  const handleSearch = (query) => {
    const foundItem = items.find(item => item.id.toString() === query);
    if (foundItem) {
      setSearchResults([foundItem]);
      setErrorMessage('');
    } else {
      setSearchResults([]);
      setErrorMessage('Item not found. Enter valid ID.');
    }
  };

  return (
    <div className="App">
      <Sidebar onSelectOption={handleSelectOption} />
      <div className="content">
        <h1>Inventory Management System</h1>
        {selectedOption === 'searchItem' && <SearchBar onSearch={handleSearch} />}
        {selectedOption === 'addItem' && <AddItem addItem={addItem} existingItems={items} />}
        {selectedOption === 'byCategory' && (
          <CategoryFilter items={items} updateItem={updateItem} removeItem={removeItem} />
        )}
        {selectedOption === 'allItems' && (
          <ItemList
            items={items}
            updateItem={updateItem}
            removeItem={removeItem}
            onAddItem={() => handleSelectOption('addItem')}
          />
        )}
        {selectedOption === 'lowStock' && <LowStockItems items={items} />}
        {searchResults.length > 0 ? (
          <div>
            <h2>Search Results:</h2>
            <ItemList
              items={searchResults}
              updateItem={updateItem}
              removeItem={removeItem}
            />
          </div>
        ) : (
          selectedOption === 'searchItem' && errorMessage && (
            <div className="error-message">{errorMessage}</div> 
          )
        )}
      </div>
    </div>
  );
};

export default App;
