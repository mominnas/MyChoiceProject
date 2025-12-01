import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api/items/';

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [group, setGroup] = useState('Primary');
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(API_BASE);
      setItems(res.data);
    } catch (err) {
      setMessage('Could not fetch items');
    }
  };

  const createItem = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_BASE, { name, group });
      setName('');
      fetchItems();
    } catch (err) {
      setMessage(err.response?.data || 'Error creating item');
    }
  };

  const selectItem = async (id) => {
    try {
      const res = await axios.get(API_BASE + id + '/');
      setSelected(res.data);
    } catch (err) {
      setMessage('Could not fetch item');
    }
  };

  const updateItem = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(API_BASE + selected.id + '/', { name: selected.name, group: selected.group });
      setSelected(null);
      fetchItems();
    } catch (err) {
      setMessage(err.response?.data || 'Error updating');
    }
  };

  return (
    <div>
      {message && <div style={{ color: 'red' }}>{JSON.stringify(message)}</div>}
      <form onSubmit={createItem} style={{ marginBottom: 20 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <select value={group} onChange={(e) => setGroup(e.target.value)}>
          <option>Primary</option>
          <option>Secondary</option>
        </select>
        <button type="submit">Create</button>
      </form>

      <ul>
        {items.map((it) => (
          <li key={it.id}>
            {it.name} ({it.group}) <button onClick={() => selectItem(it.id)}>View</button>
          </li>
        ))}
      </ul>

      {selected && (
        <div style={{ marginTop: 20 }}>
          <h3>Update Item</h3>
          <form onSubmit={updateItem}>
            <input value={selected.name} onChange={(e) => setSelected({ ...selected, name: e.target.value })} required />
            <select value={selected.group} onChange={(e) => setSelected({ ...selected, group: e.target.value })}>
              <option>Primary</option>
              <option>Secondary</option>
            </select>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setSelected(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}
