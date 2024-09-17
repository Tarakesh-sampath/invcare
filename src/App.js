import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AddItem from './components/AddItem';
import SearchItem from './components/SearchItem';
import UpdateItem from './components/UpdateItem';
import Billing from './components/Billing';
import BillSummary from './components/BillSummary';
import './App.css'; // Import global styles

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-item" element={<AddItem />} />
      <Route path="/search-item" element={<SearchItem />} />
      <Route path="/update-item" element={<UpdateItem />} />
      <Route path="/billing" element={<Billing />} />
      <Route path="/bill-summary" element={<BillSummary />} />
    </Routes>
  </Router>
);

export default App;
