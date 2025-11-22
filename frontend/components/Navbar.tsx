// frontend/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, Zap, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from "react-router-dom";
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onLoginClick: () => void;
  onSearchClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onSearchClick = () => {} }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Bestseller', href: '#bestseller' },
    { name: 'Inspiration', href: '#inspiration' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-panel border-b border-white/10 py-3' : 'bg-transparent py-6'
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
          {navLinks.map((link) => {
            if (link.href.startsWith('/')) {
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-medium text-gray-300 hover:text-white hover:text-glow-neon transition-all"
                >
                  {link.name}
                </Link>
              );
            }
            return (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-white hover:text-glow-neon transition-all"
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button onClick={() => { onSearchClick(); }} className="p-2 text-gray-300 hover:text-white transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button onClick={() => { onLoginClick(); }} className="p-2 text-gray-300 hover:text-white transition-colors">
            <User className="w-5 h-5" />
          </button>
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
              {navLinks.map((link) => {
                if (link.href.startsWith('/')) {
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="text-lg font-medium text-gray-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  );
                }
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium text-gray-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                );
              })}
              <button
                onClick={() => {
                  onLoginClick();
                  setMobileMenuOpen(false);
                }}
                className="text-lg font-medium text-gray-200"
              >
                Login / Register
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
