import React from 'react';
import ItemList from './ItemList';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">MyChoice</h1>
          <p className="app-subtitle">More Choice. More Savings.</p>
        </div>
      </header>
      <main className="app-main">
        <div className="container">
          <ItemList />
        </div>
      </main>
    </div>
  );
}

export default App;
