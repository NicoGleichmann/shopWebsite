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
import { VerifyEmailPage } from './components/VerifyEmailPage';
import { FAQPage } from './components/FAQPage';
import { ContactPage } from './components/ContactPage';
import { AboutUsPage } from './components/AboutUsPage';
import AGBPage from './components/AGBPage';
import DatenschutzPage from './components/DatenschutzPage';
import ImpressumPage from './components/ImpressumPage';
import { useAuth } from './context/AuthContext';
import { SettingsModal } from './components/SettingsModal';

const App: React.FC = () => {
  const { isLoginModalOpen, openLoginModal, closeLoginModal, token, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const openSettingsModal = () => setIsSettingsModalOpen(true);
  const closeSettingsModal = () => setIsSettingsModalOpen(false);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col">
      <Navbar 
        onLoginClick={openLoginModal}
        onSearchClick={() => setIsSearchOpen(true)}
        isLoggedIn={!!token}
        onLogout={logout}
        onSettingsClick={openSettingsModal}
      />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<AllProductsPage />} />
          <Route path="/lookbook" element={<LookbookPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/agb" element={<AGBPage />} />
          <Route path="/datenschutz" element={<DatenschutzPage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:id" element={<ProductPage />} />
          
          {/* NEUE ROUTE FÜR EMAIL VERIFIZIERUNG */}
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          
        </Routes>
      </main>
      <Login isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <SearchMenu isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <SettingsModal isOpen={isSettingsModalOpen} onClose={closeSettingsModal} />
    </div>
  );
};

export default App;