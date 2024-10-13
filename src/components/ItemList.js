import React, { useState, useMemo } from 'react';
import './style.css';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';

const ItemList = ({ items, updateItem, removeItem, onAddItem }) => {
  const [editingItemId, setEditingItemId] = useState(null);
  const [updatedItem, setUpdatedItem] = useState({});
  const [confirmId, setConfirmId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [successMessages, setSuccessMessages] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

  const handleEdit = (item) => {
    setEditingItemId(item.id);
    setUpdatedItem(item);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate quantity and price inputs
    if (name === 'quantity' && (!Number.isInteger(Number(value)) || Number(value) <= 0)) {
      alert('Quantity must be a whole number greater than 0.');
      return;
    }

    if (name === 'price' && (Number(value) <= 0)) {
      alert('Price must be a positive number.');
      return;
    }

    setUpdatedItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setActionType('save');
    setShowModal(true);
  };

  const handleDelete = (itemId) => {
    setActionType('delete');
    setConfirmId(itemId.toString());
    setShowModal(true);
  };

  const confirmAction = () => {
    // Check ID matches the item being updated
    if (confirmId === updatedItem.id.toString()) {
      const oldItem = items.find(item => item.id === updatedItem.id);
      const changes = [];

      // Log changes for the update
      if (oldItem.name !== updatedItem.name) {
        changes.push(`The item "${oldItem.name}" with ID ${updatedItem.id} has been updated to ${updatedItem.name}`);
      }
      
      if (oldItem.quantity !== updatedItem.quantity) {
        changes.push(`The quantity of item "${oldItem.name}" is updated from ${oldItem.quantity} to ${updatedItem.quantity}`);
      }

      if (oldItem.price !== updatedItem.price) {
        changes.push(`The price of item "${oldItem.name}" is updated from ₱${oldItem.price} to ₱${updatedItem.price}`);
      }

      // Perform the action
      if (actionType === 'save') {
        updateItem(updatedItem.id, updatedItem);
        setSuccessMessages(changes);
      } else {
        removeItem(updatedItem.id);
        setSuccessMessages([`Item "${oldItem.name}" deleted successfully!`]);
      }

      setEditingItemId(null);
    } else {
      alert("ID mismatch. Action cancelled.");
    }
    
    setShowModal(false);
    setConfirmId('');
    setTimeout(() => setSuccessMessages([]), 5000);
  };

  const cancelAction = () => {
    setShowModal(false);
    setConfirmId('');
  };

  const requestSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'ascending' ? 'descending' : 'ascending',
    }));
  };

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const aValue = sortConfig.key === 'quantity' || sortConfig.key === 'price' ? Number(a[sortConfig.key]) : a[sortConfig.key].toString();
      const bValue = sortConfig.key === 'quantity' || sortConfig.key === 'price' ? Number(b[sortConfig.key]) : b[sortConfig.key].toString();
  
      return typeof aValue === 'string' && typeof bValue === 'string'
        ? (sortConfig.direction === 'ascending' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue))
        : (sortConfig.direction === 'ascending' ? aValue - bValue : bValue - aValue);
    });
  }, [items, sortConfig]);

  return (
    <div className="item-list">
      <h3>Item List</h3>
      {successMessages.length > 0 && (
        <div className="success-messages">
          {successMessages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
      )}
      {items.length === 0 ? (
        <div className="no-items-container">
          <p>List is empty.</p>
          <button className="add-item-button" onClick={onAddItem}>Add item to Get Started</button>
        </div>
      ) : (
        <table className="item-table">
          <thead>
            <tr>
              <th>ID</th>
              {['name', 'quantity', 'price'].map((key) => (
                <th key={key} onClick={() => requestSort(key)}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  {sortConfig.key === key && (sortConfig.direction === 'ascending' ? <FaCaretUp /> : <FaCaretDown />)}
                  {sortConfig.key !== key && <FaCaretUp style={{ opacity: 0.3 }} />}
                </th>
              ))}
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                {['name', 'quantity', 'price'].map((field) => (
                  <td key={field}>
                    {editingItemId === item.id ? (
                      <input
                        type={field === 'price' || field === 'quantity' ? 'number' : 'text'}
                        name={field}
                        value={updatedItem[field]}
                        onChange={handleChange}
                      />
                    ) : field === 'price' ? `₱ ${item.price}` : item[field]}
                  </td>
                ))}
                <td>{item.category}</td>
                <td>
                  {editingItemId === item.id ? (
                    <>
                      <button className="action-button" onClick={handleSave}>Save</button>
                      <button className="action-button" onClick={() => setEditingItemId(null)}>Cancel</button>
                      <button className="action-button" onClick={() => handleDelete(item.id)}>Delete</button>
                    </>
                  ) : (
                    <button className="action-button" onClick={() => handleEdit(item)}>Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for Confirmation */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h4>Confirm action by entering ID.</h4>
            <input
              type="text"
              placeholder="Enter Item ID"
              value={confirmId}
              onChange={(e) => setConfirmId(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={confirmAction}>Confirm</button>
              <button onClick={cancelAction}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemList;
