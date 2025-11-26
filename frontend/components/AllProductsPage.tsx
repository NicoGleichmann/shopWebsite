import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassButton, GlassCard, Badge } from './GlassUI';
import { PRODUCTS } from '../constants';
import { Product, ProductCategory } from '../types';
import { useCart } from '../context/CartContext';
import { ProductModal } from './ProductModal';
import { Star, ShoppingCart, ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Footer } from './Footer';

import { useAuth } from '../context/AuthContext';

const ProductCard: React.FC<{ product: Product; onViewProduct: (product: Product) => void; }> = ({ product, onViewProduct }) => {
    const { addToCart } = useCart();
    const { token, openLoginModal } = useAuth();

    const handleAddToCart = () => {
      if (token) {
        addToCart(product);
      } else {
        openLoginModal();
      }
    };
  
    return (
      <GlassCard className="group relative flex flex-col h-full">
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {product.isNew && <Badge color="cyan">New Arrival</Badge>}
          {product.isBestseller && <Badge color="hot">Bestseller</Badge>}
        </div>
        
        {product.stockLevel === 'low' && (
          <div className="absolute top-4 right-4 z-20 bg-red-500/20 border border-red-500/50 px-2 py-1 rounded text-[10px] font-bold text-red-200 animate-pulse">
            Only 3 left!
          </div>
        )}
  
        <div className="relative h-64 w-full overflow-hidden rounded-xl mb-4 bg-gray-900">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <GlassButton 
              size="sm" 
              className="w-full bg-white/90 text-black backdrop-blur-none"
              onClick={() => onViewProduct(product)}
            >
              View Product
            </GlassButton>
          </div>
        </div>
  
        <div className="flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-2">
             <span className="text-xs text-gray-400 uppercase tracking-wider">{product.category}</span>
             <div className="flex items-center gap-1">
               <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
               <span className="text-xs text-gray-300">{product.rating}</span>
             </div>
          </div>
          
          <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-lumio-neon transition-colors">
              {product.name}
          </h3>
          
          <p className="text-sm text-gray-400 mb-4 line-clamp-2">
              {product.description}
          </p>
  
          <div className="mt-auto flex items-center justify-between">
              <div className="flex flex-col">
                  {product.originalPrice && (
                      <span className="text-xs text-gray-500 line-through">€{product.originalPrice.toFixed(2)}</span>
                  )}
                  <span className="text-xl font-display font-bold text-white">€{product.price.toFixed(2)}</span>
              </div>
              <button 
                  onClick={handleAddToCart}
                  className="bg-lumio-neon text-black font-bold py-2 px-4 rounded-lg text-sm hover:bg-cyan-300 transition-colors shadow-[0_0_15px_rgba(0,243,255,0.4)] flex items-center gap-2"
              >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to cart</span>
              </button>
          </div>
        </div>
      </GlassCard>
    );
  };

  const Dropdown: React.FC<{
    options: string[];
    selected: string;
    onSelect: (option: string) => void;
    className?: string;
  }> = ({ options, selected, onSelect, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 rounded-full text-sm font-medium transition-all glass-panel text-gray-400 hover:text-white hover:bg-white/10 flex items-center gap-2"
        >
          {selected}
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 w-48 bg-gray-900/80 backdrop-blur-lg border border-white/10 rounded-lg shadow-xl z-50"
            >
              <ul className="py-1">
                {options.map((option) => (
                  <li
                    key={option}
                    onClick={() => {
                      onSelect(option);
                      setIsOpen(false);
                    }}
                    className="px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white cursor-pointer"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

export const AllProductsPage: React.FC = () => {
  type SpecialFilter = 'None' | 'Neuheiten' | 'Bestseller' | 'Sale';

  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'All'>('All');
  const [activeSpecialFilter, setActiveSpecialFilter] = useState<SpecialFilter>('None');
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filter = params.get('filter');
    if (filter === 'Bestseller' || filter === 'Neuheiten' || filter === 'Sale') {
        setActiveSpecialFilter(filter);
    }
  }, [location.search]);

  useEffect(() => {
    let products = [...PRODUCTS];

    // 1. Apply special filter
    if (activeSpecialFilter === 'Neuheiten') {
        products = products.filter(p => p.isNew);
    } else if (activeSpecialFilter === 'Bestseller') {
        products = products.filter(p => p.isBestseller);
    } else if (activeSpecialFilter === 'Sale') {
        products = products.filter(p => p.originalPrice !== undefined);
    }

    // 2. Apply category filter
    if (activeCategory !== 'All') {
        products = products.filter(p => p.category === activeCategory);
    }

    setFilteredProducts(products);
  }, [activeCategory, activeSpecialFilter]);

  return (
    <div className="min-h-screen bg-lumio-dark text-white font-sans selection:bg-lumio-neon selection:text-black">
      <section id="all-products" className="py-20 px-6 pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
             <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">All Products</h2>
             <p className="text-lg text-gray-400">Browse our curated collection of futuristic lighting.</p>
             <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 mt-8">
                {['All', ...Object.values(ProductCategory)].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat as any)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === cat 
                        ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]' 
                        : 'glass-panel text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
                <Dropdown
                    options={['None', 'Neuheiten', 'Bestseller', 'Sale']}
                    selected={activeSpecialFilter === 'None' ? 'Weitere Filter' : activeSpecialFilter}
                    onSelect={(option) => setActiveSpecialFilter(option as SpecialFilter)}
                />
             </div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={product.id}
                >
                  <ProductCard product={product} onViewProduct={setSelectedProduct} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <Footer />
    </div>
  );
};