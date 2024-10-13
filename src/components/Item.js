import React, { useState } from 'react';

const Item = ({ item, updateItem, removeItem, editingItemId, setEditingItemId }) => {
  const [updatedItem, setUpdatedItem] = useState(item);
  const [confirmId, setConfirmId] = useState('');

  const handleSave = () => {
    if (confirmId === updatedItem.id.toString()) {
      updateItem(updatedItem.id, updatedItem);
      setEditingItemId(null);
    } else {
      alert("ID does not match.");
    }
  };

  const handleDelete = () => {
    if (confirmId === item.id.toString()) {
      removeItem(item.id);
    } else {
      alert("ID does not match.");
    }
  };

  const isEditing = editingItemId === item.id;

  return (
    <tr>
      <td>{item.id}</td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={updatedItem.name}
            onChange={(e) => setUpdatedItem({ ...updatedItem, name: e.target.value })}
          />
        ) : item.name}
      </td>
      <td>
        {isEditing ? (
          <input
            type="number"
            value={updatedItem.quantity}
            onChange={(e) => setUpdatedItem({ ...updatedItem, quantity: Number(e.target.value) })}
          />
        ) : item.quantity}
      </td>
      <td>
        {isEditing ? (
          <input
            type="number"
            value={updatedItem.price}
            onChange={(e) => setUpdatedItem({ ...updatedItem, price: Number(e.target.value) })}
          />
        ) : `₱ ${item.price}`}
      </td>
      <td>{item.category}</td>
      <td>
        {isEditing ? (
          <>
            <input
              type="text"
              placeholder="Confirm ID"
              value={confirmId}
              onChange={(e) => setConfirmId(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditingItemId(null)}>Cancel</button>
            <button onClick={handleDelete}>Delete</button>
          </>
        ) : (
          <button onClick={() => setEditingItemId(item.id)}>Edit</button>
        )}
      </td>
    </tr>
  );
};

export default Item;
