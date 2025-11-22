import React from 'react';
import { useParams } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';
import { Star, ShoppingCart } from 'lucide-react';

export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === id);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen bg-lumio-dark text-white">
        <h1 className="text-4xl font-bold">404 - Product Not Found</h1>
      </div>
    );
  }

  return (
    <div className="bg-lumio-dark min-h-screen text-white p-8 lg:p-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Image */}
        <div className="relative aspect-square">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover rounded-2xl shadow-2xl shadow-lumio-neon/10"
          />
        </div>

        {/* Right Column: Details */}
        <div className="flex flex-col justify-center">
          <span className="text-sm uppercase tracking-widest text-lumio-neon mb-2">{product.category}</span>
          <h1 className="text-4xl lg:text-6xl font-display font-bold text-white mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
                />
              ))}
            </div>
            <span className="text-gray-400">({product.reviews} reviews)</span>
          </div>

          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col">
              {product.originalPrice && (
                <span className="text-base text-gray-500 line-through">€{product.originalPrice.toFixed(2)}</span>
              )}
              <span className="text-4xl font-display font-bold text-white">€{product.price.toFixed(2)}</span>
            </div>
          </div>

          <button 
            onClick={() => addToCart(product)}
            className="bg-lumio-neon text-black font-bold py-4 px-8 rounded-full text-lg hover:bg-cyan-300 transition-colors shadow-[0_0_25px_rgba(0,243,255,0.5)] flex items-center justify-center gap-3 w-full lg:w-auto"
          >
            <ShoppingCart className="w-6 h-6" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
