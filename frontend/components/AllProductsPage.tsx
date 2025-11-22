import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassButton, GlassCard, Badge } from './GlassUI';
import { PRODUCTS } from '../constants';
import { Product, ProductCategory } from '../types';
import { useCart } from '../context/CartContext';
import { ProductModal } from './ProductModal';
import { Star, ShoppingCart } from 'lucide-react';

const ProductCard: React.FC<{ product: Product; onViewProduct: (product: Product) => void; }> = ({ product, onViewProduct }) => {
    const { addToCart } = useCart();
  
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
                  onClick={() => addToCart(product)}
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

export const AllProductsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'All'>('All');
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProducts(PRODUCTS);
    } else {
      setFilteredProducts(PRODUCTS.filter(p => p.category === activeCategory));
    }
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-lumio-dark text-white font-sans selection:bg-lumio-neon selection:text-black">
      <section id="all-products" className="py-20 px-6 pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
             <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">All Products</h2>
             <p className="text-lg text-gray-400">Browse our curated collection of futuristic lighting.</p>
             <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-8">
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
    </div>
  );
};
