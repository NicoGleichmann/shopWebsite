// frontend/components/Cart.tsx
import React from 'react';
import { Navbar } from './Navbar';
import { GlassCard } from './GlassUI';
import { X, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const EmptyCart = () => (
    <div className="text-center py-20">
        <ShoppingBag className="w-24 h-24 mx-auto text-gray-600" />
        <h2 className="mt-6 text-2xl font-bold text-white">Dein Warenkorb ist leer</h2>
        <p className="mt-2 text-gray-400">Sieht so aus, als hättest du noch nichts hinzugefügt. Zeit, das zu ändern!</p>
        <div className="mt-8">
            <Link to="/" className="text-lumio-neon hover:text-cyan-300 font-bold flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Zurück zum Shop</span>
            </Link>
        </div>
    </div>
);


export const Cart: React.FC = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const isEmpty = cartItems.length === 0;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const versand = 4.99;
  const total = subtotal + versand;

  return (
    <div className="min-h-screen bg-lumio-dark text-white font-sans selection:bg-lumio-neon selection:text-black">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-28 pb-12">
        <h1 className="text-4xl font-display font-bold mb-8 text-white text-glow-neon">Warenkorb</h1>
        
        {isEmpty ? <EmptyCart /> : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items List */}
                <div className="lg:col-span-2">
                    <GlassCard className="p-0">
                        <ul className="divide-y divide-white/10">
                            {cartItems.map((item) => (
                                <li key={item.id} className="p-6 flex items-start gap-6">
                                    <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg object-cover" />
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-lg text-white">{item.name}</h3>
                                            <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-white transition-colors">
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                        {item.stock === 'low' && <span className="text-xs text-yellow-400">Nur noch wenige verfügbar</span>}
                                        
                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <button onClick={() => decreaseQuantity(item.id)} className="p-1 rounded-full glass-panel-secondary"><Minus className="w-4 h-4" /></button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => increaseQuantity(item.id)} className="p-1 rounded-full glass-panel-secondary"><Plus className="w-4 h-4" /></button>
                                            </div>
                                            <span className="font-bold text-lg">€{(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </GlassCard>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <GlassCard>
                        <h2 className="text-2xl font-bold mb-6">Zusammenfassung</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between text-gray-300">
                                <span>Zwischensumme</span>
                                <span>€{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-300">
                                <span>Versand</span>
                                <span>€{versand.toFixed(2)}</span>
                            </div>
                            <div className="border-t border-white/10 my-4"></div>
                            <div className="flex justify-between text-white font-bold text-lg">
                                <span>Gesamtbetrag</span>
                                <span>€{total.toFixed(2)}</span>
                            </div>
                        </div>
                        <Link to="/checkout" className="mt-8 block w-full text-center bg-lumio-neon text-black font-bold py-3 px-4 rounded-lg text-base hover:bg-cyan-300 transition-colors shadow-[0_0_20px_rgba(0,243,255,0.5)]">
                            Sicher zur Kasse
                        </Link>
                    </GlassCard>
                    <div className="text-center mt-4">
                        <Link to="/" className="text-sm text-gray-400 hover:text-white flex items-center justify-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            <span>Weiter shoppen</span>
                        </Link>
                    </div>
                </div>
            </div>
        )}
      </main>
    </div>
  );
};
