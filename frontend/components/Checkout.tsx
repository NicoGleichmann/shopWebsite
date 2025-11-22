// frontend/components/Checkout.tsx
import React from 'react';
import { Navbar } from './Navbar';
import { GlassCard } from './GlassUI';
import { Lock, ArrowLeft, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const Checkout: React.FC = () => {
  const { cartItems } = useCart();

  const [selectedPayment, setSelectedPayment] = React.useState('credit-card');

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const versand = 4.99;
  const total = subtotal + versand;

  const handlePaymentSelection = (method: string) => {
    setSelectedPayment(method);
  };

  return (
    <div className="min-h-screen bg-lumio-dark text-white font-sans selection:bg-lumio-neon selection:text-black">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-28 pb-12">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-display font-bold text-white text-glow-neon">Checkout</h1>
            <p className="text-gray-400 mt-2 flex items-center justify-center gap-2">
                <Lock className="w-4 h-4 text-green-400" />
                <span>Sichere & verschlüsselte Zahlung</span>
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Shipping Information */}
            <section>
                <GlassCard>
                    <h2 className="text-2xl font-bold mb-6">Lieferadresse</h2>
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="Vorname" className="input-field" />
                            <input type="text" placeholder="Nachname" className="input-field" />
                        </div>
                        <input type="email" placeholder="Email" className="input-field w-full" />
                        <input type="text" placeholder="Adresse" className="input-field w-full" />
                        <div className="grid grid-cols-3 gap-4">
                            <input type="text" placeholder="PLZ" className="input-field" />
                            <input type="text" placeholder="Stadt" className="input-field col-span-2" />
                        </div>
                        <input type="text" placeholder="Land" className="input-field w-full" value="Deutschland" disabled />
                    </form>
                </GlassCard>

                {/* Payment Method */}
                <GlassCard className="mt-8">
                    <h2 className="text-2xl font-bold mb-6">Zahlungsmethode</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div 
                            className={`p-4 border rounded-lg flex items-center justify-center flex-col cursor-pointer transition-all ${selectedPayment === 'credit-card' ? 'border-lumio-neon bg-lumio-neon/10' : 'border-white/20 bg-white/5 hover:border-lumio-neon'}`}
                            onClick={() => handlePaymentSelection('credit-card')}
                        >
                            <CreditCard className="w-8 h-8 text-lumio-neon mb-2" />
                            <span className="text-sm">Kreditkarte</span>
                        </div>
                        <div 
                            className={`p-4 border rounded-lg flex items-center justify-center flex-col cursor-pointer transition-all ${selectedPayment === 'paypal' ? 'border-blue-400 bg-blue-400/10' : 'border-white/20 bg-white/5 hover:border-blue-400'}`}
                            onClick={() => handlePaymentSelection('paypal')}
                        >
                            <img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png" alt="PayPal" className="w-10 h-10 mb-2" />
                            <span className="text-sm">PayPal</span>
                        </div>
                        <div 
                            className={`p-4 border rounded-lg flex items-center justify-center flex-col cursor-pointer transition-all ${selectedPayment === 'klarna' ? 'border-pink-400 bg-pink-400/10' : 'border-white/20 bg-white/5 hover:border-pink-400'}`}
                            onClick={() => handlePaymentSelection('klarna')}
                        >
                            <svg className="w-8 h-8 mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.996 3.328C6.968 3.328 3.32 7.016 3.32 12.004C3.32 16.992 6.968 20.68 11.996 20.68C17.024 20.68 20.672 16.992 20.672 12.004C20.672 7.016 17.024 3.328 11.996 3.328ZM16.34 16.3H14.168L12.596 12.892L11.024 16.3H8.852L11.412 11.068L8.844 5.7H11.016L12.588 9.108L14.16 5.7H16.332L13.772 11.068L16.34 16.3Z" fill="#F8B4F8"/>
                            </svg>
                            <span className="text-sm">Klarna</span>
                        </div>
                        <div 
                            className={`p-4 border rounded-lg flex items-center justify-center flex-col cursor-pointer transition-all ${selectedPayment === 'google-pay' ? 'border-green-400 bg-green-400/10' : 'border-white/20 bg-white/5 hover:border-green-400'}`}
                            onClick={() => handlePaymentSelection('google-pay')}
                        >
                            <svg className="w-8 h-8 mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.89 10.11V13.89H17.21C17.05 14.77 16.5 15.57 15.75 16.11C14.83 16.78 13.43 17.33 11.89 17.33C9.07001 17.33 6.77001 15.03 6.77001 12.21C6.77001 9.39 9.07001 7.09 11.89 7.09C13.24 7.09 14.34 7.6 15.11 8.32L17.47 6.04C15.8 4.49 13.92 3.5 11.89 3.5C7.92001 3.5 4.77001 6.65 4.77001 10.62C4.77001 14.59 7.92001 17.74 11.89 17.74C15.93 17.74 18.89 14.84 18.89 10.82C18.89 10.23 18.83 9.66 18.72 9.11H9.89Z" fill="#4285F4"/>
                            </svg>
                            <span className="text-sm">Google Pay</span>
                        </div>
                        <div 
                            className={`p-4 border rounded-lg flex items-center justify-center flex-col cursor-pointer transition-all ${selectedPayment === 'apple-pay' ? 'border-white bg-white/10' : 'border-white/20 bg-white/5 hover:border-white'}`}
                            onClick={() => handlePaymentSelection('apple-pay')}
                        >
                            <svg className="w-8 h-8 mb-2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                                <path d="M46.66 32.66C46.66 22.13 51.77 16.64 52.53 15.81C51.27 13.84 48.9 12.81 46.81 12.72C42.45 12.32 38.64 15.14 36.66 15.14C34.68 15.14 31.39 12.71 27.67 12.71C22.68 12.71 18.31 15.95 16.13 20.85C11.53 22.88 9.33002 28.31 9.33002 33.91C9.33002 42.12 13.52 47.93 18.73 47.93C22.38 47.93 24.3 45.71 28.46 45.71C32.53 45.71 34.18 47.93 38.08 47.93C43.18 47.93 47.38 42.3 47.61 37.11C42.87 36.21 39.52 32.84 39.52 28.16C39.52 24.12 42.42 21.28 46.24 20.35C47.88 19.52 49.33 19.33 50.73 19.33" fill="white"/>
                                <path d="M42.2 9.59003C43.77 7.78003 44.66 5.56003 44.24 3.33003C41.87 3.49003 39.47 4.80003 37.89 6.61003C36.49 8.21003 35.45 10.41 35.92 12.72C38.42 12.72 40.73 11.3 42.2 9.59003" fill="white"/>
                            </svg>
                            <span className="text-sm">Apple Pay</span>
                        </div>
                    </div>
                </GlassCard>
            </section>

            {/* Order Summary */}
            <section>
                <GlassCard>
                    <h2 className="text-2xl font-bold mb-6">Bestellübersicht</h2>
                    <div className="space-y-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between items-center text-sm">
                                <span className="text-gray-300">{item.name} x{item.quantity}</span>
                                <span className="font-medium">€{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-white/10 my-6"></div>
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
                    <button className="mt-8 w-full bg-lumio-neon text-black font-bold py-3 px-4 rounded-lg text-base hover:bg-cyan-300 transition-colors shadow-[0_0_20px_rgba(0,243,255,0.5)]">
                        Jetzt kaufen (€{total.toFixed(2)})
                    </button>
                </GlassCard>
                <div className="text-center mt-6">
                    <Link to="/cart" className="text-sm text-gray-400 hover:text-white flex items-center justify-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Zurück zum Warenkorb</span>
                    </Link>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
