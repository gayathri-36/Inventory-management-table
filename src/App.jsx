import React, { useState } from 'react';
import './index.css';

const App = () => {
  const [inventory, setInventory] = useState([
    
  ]);
  
  const [newItem, setNewItem] = useState({ name: '', category: '', quantity: '' });
  const [filterCategory, setFilterCategory] = useState('All');
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleAddItem = () => {
    if (!newItem.name || !newItem.category || !newItem.quantity) return;
    
    const newInventory = [...inventory, { id: Date.now(), ...newItem }];
    setInventory(newInventory);
    setNewItem({ name: '', category: '', quantity: '' });
  };

  const handleDeleteItem = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  const handleEditItem = (item) => {
    setIsEditing(true);
    setEditingItem(item);
    setNewItem({ name: item.name, category: item.category, quantity: item.quantity });
  };

  const handleSaveEdit = () => {
    const updatedInventory = inventory.map(item => 
      item.id === editingItem.id ? { ...editingItem, ...newItem } : item
    );
    setInventory(updatedInventory);
    setIsEditing(false);
    setEditingItem(null);
    setNewItem({ name: '', category: '', quantity: '' });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingItem(null);
    setNewItem({ name: '', category: '', quantity: '' });
  };

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleSortByQuantity = () => {
    const sortedInventory = [...inventory].sort((a, b) => a.quantity - b.quantity);
    setInventory(sortedInventory);
  };

  const filteredInventory = inventory.filter(item => 
    filterCategory === 'All' || item.category === filterCategory
  );

  return (
    <div className="App">
      <h1>Inventory Management</h1>

      <div className="filters">
        <select onChange={handleFilterChange}>
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Furniture">Furniture</option>
        </select>         
        <button onClick={handleSortByQuantity}>Sort by Quantity</button>
      </div>

      <div className="form">
        <input 
          type="text" 
          placeholder="Item Name" 
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input 
          type="text" 
          placeholder="Category" 
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
        />
        <input 
          type="number" 
          placeholder="Quantity" 
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
        />
        {isEditing ? (
          <>
            <button onClick={handleSaveEdit}>Save Edit</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </>
        ) : (
          <button onClick={handleAddItem}>Add Item</button>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map(item => (
            <tr key={item.id} className={item.quantity < 10 ? 'low-stock' : ''}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => handleEditItem(item)}>Edit</button>
                <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
