import React, { useState } from 'react';
import './style.css';

const AddItem = ({ addItem, existingItems }) => {
    const [item, setItem] = useState({ id: '', name: '', quantity: '', price: '', category: 'Clothing' });
    const [message, setMessage] = useState({ error: '', success: '' });

    const handleChange = ({ target: { name, value } }) => {
        // Ensure quantity and price are positive numbers
        if ((name === 'price' || name === 'quantity') && value.startsWith('0') && value.length > 1) {
            setMessage({ error: `${name.charAt(0).toUpperCase() + name.slice(1)} should be 1 or more.`, success: '' });
            return;
        }

        // Check if the value of quantity is a whole number and greater than 0
        if (name === 'quantity' && (!Number.isInteger(Number(value)) || Number(value) < 1)) {
            setMessage({ error: 'Quantity should be a whole number greater than 0.', success: '' });
            return;
        }

        // Check if the value of price is greater than 0
        if (name === 'price' && (Number(value) <= 0)) {
            setMessage({ error: 'Price should be a number greater than 0.', success: '' });
            return;
        }

        setMessage({ error: '', success: '' });
        setItem({ ...item, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate that the quantity is a whole number and price is a positive number
        if (existingItems.some(existingItem => existingItem.id === item.id)) {
            setMessage({ error: 'ID already exists. Please enter a unique ID.', success: '' });
            return;
        }
        if (!item.id || !item.name || item.quantity <= 0 || item.price <= 0 || !Number.isInteger(Number(item.quantity))) {
            setMessage({ error: 'Please fill in all fields with valid values. Quantity must be a whole number and price must be positive.', success: '' });
            return;
        }
        addItem(item);
        setItem({ id: '', name: '', quantity: '', price: '', category: 'Clothing' });
        setMessage({ error: '', success: 'Item added successfully!' });
        setTimeout(() => setMessage({ error: '', success: '' }), 3000);
    };

    return (
        <div className="add-item">
            <h3>Add New Item</h3>
            <form onSubmit={handleSubmit}>
                <table className="add-item-table">
                    <thead>
                        <tr>
                            {['ID', 'Name', 'Quantity', 'Price', 'Category', 'Action'].map(header => (
                                <th key={header}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {['id', 'name', 'quantity', 'price'].map(field => (
                                <td key={field}>
                                    <input
                                        type={field === 'quantity' || field === 'price' ? 'number' : 'text'}
                                        name={field}
                                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                        value={item[field]}
                                        onChange={handleChange}
                                        step={field === 'quantity' ? '1' : 'any'} // Allow only whole numbers for quantity, decimals for price
                                        min={field === 'quantity' || field === 'price' ? '0' : undefined} // Prevent negative values
                                        required
                                    />
                                </td>
                            ))}
                            <td>
                                <select name="category" value={item.category} onChange={handleChange}>
                                    {['Clothing', 'Electronics', 'Entertainment'].map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <button className="action-button" type="submit">Add Item</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            {message.error && <div className="error-message">{message.error}</div>}
            {message.success && <div className="success-message">{message.success}</div>}
        </div>
    );
};

export default AddItem;
