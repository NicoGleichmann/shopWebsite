import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, CornerUpLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

interface SearchMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchMenu: React.FC<SearchMenuProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const handleClose = () => {
    setQuery('');
    onClose();
  };

  useEffect(() => {
    // FIX: Define popularProducts here or use PRODUCTS.slice directly.
    // Since PRODUCTS is an external constant, it does not need to be in the dependency array.
    if (query.trim() === '') {
      setSearchResults(PRODUCTS.slice(0, 3));
      return;
    }

    const lowercasedQuery = query.toLowerCase();
    const results = PRODUCTS.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercasedQuery) ||
        product.description.toLowerCase().includes(lowercasedQuery)
    );
    setSearchResults(results);
    
    // FIX: Removed 'popularProducts' from dependencies to stop the loop
  }, [query]); 

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      // Logic to navigate to first result can go here
    }
    handleClose();
  };

  const recentSearches = ["LED strips", "Ambient lighting", "Neon sign", "Smart bulbs"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center z-[100] p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass-panel rounded-2xl border-white/20">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
                <input
                  type="text"
                  placeholder="Search for products, collections, and inspiration..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent text-white text-lg placeholder-gray-500 py-6 pl-16 pr-16 focus:outline-none"
                  autoFocus
                />
                <button type="button" onClick={handleClose} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </form>

              <div className="p-6 border-t border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Recent Searches</h3>
                    <ul className="space-y-2">
                      {recentSearches.map(term => (
                        <li key={term}>
                          <button
                            onClick={() => setQuery(term)}
                            className="flex items-center gap-3 text-gray-200 hover:text-white group"
                          >
                            <CornerUpLeft className="text-gray-500 group-hover:text-lumio-neon" size={18} />
                            <span>{term}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                      {query ? 'Search Results' : 'Popular Products'}
                    </h3>
                    <ul className="space-y-2">
                      {searchResults.length > 0 ? (
                        searchResults.map(product => (
                          <li key={product.id}>
                            <Link
                              to={`/product/${product.id}`}
                              onClick={handleClose}
                              className="flex items-center gap-3 text-gray-200 hover:text-white group"
                            >
                              <Search className="text-gray-500 group-hover:text-lumio-neon" size={18} />
                              <span>{product.name}</span>
                            </Link>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-400">No products found.</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchMenu;