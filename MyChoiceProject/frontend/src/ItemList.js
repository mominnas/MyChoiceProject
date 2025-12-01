import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ItemList.css';

const API_BASE = 'http://localhost:8000/api/items/';

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [group, setGroup] = useState('Primary');
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(API_BASE);
      setItems(res.data);
      if (message === 'Could not fetch items') {
        setMessage('');
      }
    } catch (err) {
      showMessage('Could not fetch items', 'error');
    }
  };

  const showMessage = (msg, type = 'error') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 4000);
  };

  const createItem = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await axios.post(API_BASE, { name, group });
      setName('');
      showMessage('Item created successfully', 'success');
      fetchItems();
    } catch (err) {
      showMessage(err.response?.data?.name?.[0] || 'Error creating item', 'error');
    }
  };

  const selectItem = async (id) => {
    try {
      const res = await axios.get(API_BASE + id + '/');
      setSelected(res.data);
    } catch (err) {
      showMessage('Could not fetch item', 'error');
    }
  };

  const updateItem = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(API_BASE + selected.id + '/', { name: selected.name, group: selected.group });
      setSelected(null);
      showMessage('Item updated successfully', 'success');
      fetchItems();
    } catch (err) {
      showMessage(err.response?.data?.name?.[0] || 'Error updating', 'error');
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await axios.delete(API_BASE + id + '/');
      showMessage('Item deleted successfully', 'success');
      if (selected?.id === id) setSelected(null);
      fetchItems();
    } catch (err) {
      showMessage('Error deleting item', 'error');
    }
  };

  return (
    <div className="item-list-container">
      {message && (
        <div className={`message message-${messageType}`}>
          <span>{typeof message === 'string' ? message : JSON.stringify(message)}</span>
          <button className="message-close" onClick={() => setMessage('')}>×</button>
        </div>
      )}

      <div className="section">
        <h2 className="section-title">Add New Item</h2>
        <form onSubmit={createItem} className="create-form">
          <div className="form-group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter item name"
              required
              className="form-input"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <select
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                className="form-select"
              >
                <option>Primary</option>
                <option>Secondary</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Create Item
            </button>
          </div>
        </form>
      </div>

      <div className="section">
        <h2 className="section-title">Your Items</h2>
        {items.length === 0 ? (
          <div className="empty-state">
            <p>No items yet. Create one to get started!</p>
          </div>
        ) : (
          <div className="items-grid">
            {items.map((it) => (
              <div key={it.id} className="item-card">
                <div className="item-header">
                  <h3 className="item-name">{it.name}</h3>
                  <span className={`item-badge item-badge-${it.group.toLowerCase()}`}>
                    {it.group}
                  </span>
                </div>
                <div className="item-actions">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => selectItem(it.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteItem(it.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Item</h3>
              <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            </div>
            <form onSubmit={updateItem} className="modal-body">
              <div className="form-group">
                <label className="form-label">Item Name</label>
                <input
                  type="text"
                  value={selected.name}
                  onChange={(e) => setSelected({ ...selected, name: e.target.value })}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  value={selected.group}
                  onChange={(e) => setSelected({ ...selected, group: e.target.value })}
                  className="form-select"
                >
                  <option>Primary</option>
                  <option>Secondary</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setSelected(null)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
