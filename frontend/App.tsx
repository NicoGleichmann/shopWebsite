// frontend/App.tsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import Login from './components/Login';
import { Navbar } from './components/Navbar';
import SearchMenu from './components/SearchMenu';
import { ProductPage } from './components/ProductPage';
import { LookbookPage } from './components/LookbookPage';
import { AllProductsPage } from './components/AllProductsPage';
import { useAuth } from './context/AuthContext';

const App: React.FC = () => {
  const { isLoginModalOpen, openLoginModal, closeLoginModal, token, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="bg-gray-900">
      <Navbar 
        onLoginClick={openLoginModal}
        onSearchClick={() => setIsSearchOpen(true)}
        isLoggedIn={!!token}
        onLogout={logout}
      />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<AllProductsPage />} />
          <Route path="/lookbook" element={<LookbookPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </main>
      <Login isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <SearchMenu isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default App;