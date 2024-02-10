// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ListScreen from './ListScreen';
import DetailScreen from './DetailScreen';
import Logs from './Logs';

const App = () => {
  return (
    <Router>
      <div className="container mt-4">
        <h1>My React App</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/logs">Logs</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<ListScreen />} />
          <Route path="/post/:id" element={<DetailScreen />} />
          <Route path="/logs" element={<Logs />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
