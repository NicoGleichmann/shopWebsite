// frontend/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, Zap, User, LogIn, Settings, UserCircle, LogOut as LogOutIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from "react-router-dom";
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onLoginClick: () => void;
  onSearchClick?: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  onSettingsClick: () => void;
  onProfileClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onSearchClick = () => {}, isLoggedIn, onLogout, onSettingsClick, onProfileClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Lookbook', href: '/lookbook' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen ? 'glass-panel border-b border-white/10 py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Zap className="w-6 h-6 text-lumio-neon group-hover:animate-pulse" />
            <div className="absolute inset-0 bg-lumio-neon blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
          </div>
          <span className="font-display font-bold text-xl tracking-widest text-white">LUMIO</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm font-medium text-gray-300 hover:text-white hover:text-glow-neon transition-all"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button onClick={() => { onSearchClick(); }} className="p-2 text-gray-300 hover:text-white transition-colors">
            <Search className="w-5 h-5" />
          </button>
          
          <div 
            className="relative"
            onMouseEnter={() => setProfileMenuOpen(true)}
            onMouseLeave={() => setProfileMenuOpen(false)}
          >
            {isLoggedIn ? (
              <button className="p-2 text-gray-300 hover:text-white transition-colors">
                <User className="w-5 h-5" />
              </button>
            ) : (
              <button onClick={onLoginClick} className="p-2 text-gray-300 hover:text-white transition-colors">
                <LogIn className="w-5 h-5" />
              </button>
            )}
            <AnimatePresence>
              {isLoggedIn && profileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full right-0 mt-3 w-48"
                >
                    <div className="glass-panel p-2 rounded-lg border border-white/10 shadow-2xl">
                        <button onClick={() => { setProfileMenuOpen(false); onProfileClick(); }} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white rounded-md transition-colors">
                            <UserCircle size={16} />
                            <span>Profil</span>
                        </button>
                        <button onClick={() => { setProfileMenuOpen(false); onSettingsClick(); }} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white rounded-md transition-colors">
                            <Settings size={16} />
                            <span>Einstellungen</span>
                        </button>
                        <div className="h-px bg-white/10 my-1" />
                        <button onClick={() => { onLogout(); setProfileMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-md transition-colors">
                            <LogOutIcon size={16} />
                            <span>Abmelden</span>
                        </button>
                    </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/cart" className="relative p-2 text-gray-300 hover:text-white transition-colors group">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-lumio-hot rounded-full text-white text-xs flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
          
          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-gray-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-white/10"
          >
            <div className="flex flex-col p-6 gap-4">                
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-lg font-medium text-gray-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-white/10 my-2" />
              {isLoggedIn ? (
                <>
                  <button onClick={() => { setMobileMenuOpen(false); onProfileClick(); }} className="flex items-center gap-4 text-lg font-medium text-gray-200">
                    <UserCircle size={20} />
                    <span>Profil</span>
                  </button>
                  <button onClick={() => { setMobileMenuOpen(false); onSettingsClick(); }} className="flex items-center gap-4 text-lg font-medium text-gray-200">
                    <Settings size={20} />
                    <span>Einstellungen</span>
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-4 text-lg font-medium text-red-400"
                  >
                    <LogOutIcon size={20} />
                    <span>Abmelden</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    onLoginClick();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-4 text-lg font-medium text-gray-200"
                >
                  <LogIn size={20} />
                  <span>Login / Register</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
