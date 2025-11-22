// frontend/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { Cart } from './components/Cart';
import Login from './components/Login';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;