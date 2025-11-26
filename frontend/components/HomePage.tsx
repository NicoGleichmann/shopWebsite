// frontend/components/HomePage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, Zap, TrendingUp, Box, Check, Instagram, Twitter, Facebook, ShoppingCart, Mail, ChevronDown } from 'lucide-react';
import { GlassButton, GlassCard, Badge } from './GlassUI';
import { PRODUCTS, TESTIMONIALS } from '../constants';
import { Product, ProductCategory } from '../types';
import { useCart } from '../context/CartContext';
import { ProductModal } from './ProductModal';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Footer } from './Footer';

// --- HELPER COMPONENTS WITHIN APP.TSX TO SIMPLIFY ---

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
      {/* Badges */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        {product.isNew && <Badge color="cyan">New Arrival</Badge>}
        {product.isBestseller && <Badge color="hot">Bestseller</Badge>}
      </div>
      
      {/* Stock Status */}
      {product.stockLevel === 'low' && (
        <div className="absolute top-4 right-4 z-20 bg-red-500/20 border border-red-500/50 px-2 py-1 rounded text-[10px] font-bold text-red-200 animate-pulse">
          Only 3 left!
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden rounded-xl mb-4 bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        {/* Add to Cart Overlay */}
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

      {/* Content */}
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



export const HomePage: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);
  
  type SpecialFilter = 'None' | 'Neuheiten' | 'Bestseller' | 'Sale';

  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'All'>('All');
  const [activeSpecialFilter, setActiveSpecialFilter] = useState<SpecialFilter>('None');
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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

  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setSubscribeMessage('Bitte gib eine gültige E-Mail-Adresse ein.');
      return;
    }
    setIsSubscribing(true);
    setSubscribeMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubscribeMessage('Danke für deine Anmeldung! Check deine Mails.');
        setEmail('');
        setTimeout(() => setSubscribeMessage(''), 5000);
      } else {
        const errorText = await response.text();
        let errorMessage = 'Anmeldung fehlgeschlagen.';
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.message || errorMessage;
        } catch (e) {
          console.error('Non-JSON error response from server:', errorText);
          errorMessage = 'Ein Serverfehler ist aufgetreten. Status: ' + response.status;
        }
        setSubscribeMessage(errorMessage);
        setTimeout(() => setSubscribeMessage(''), 7000);
      }
    } catch (error) {
      console.error('Subscription fetch error:', error);
      setSubscribeMessage('Ein Netzwerkfehler ist aufgetreten. Bitte versuche es später erneut.');
      setTimeout(() => setSubscribeMessage(''), 7000);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen bg-lumio-dark text-white font-sans selection:bg-lumio-neon selection:text-black">
      {/* HERO SECTION */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background simulating video/glow */}
        <div className="absolute inset-0 bg-black">
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-lumio-neon/20 rounded-full blur-[120px] animate-blob mix-blend-screen" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-lumio-accent/20 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-screen" />
            <div className="absolute top-[20%] right-[20%] w-[30vw] h-[30vw] bg-lumio-hot/20 rounded-full blur-[120px] animate-blob animation-delay-4000 mix-blend-screen" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
        </div>
        
        <motion.div 
          style={{ y: y1, opacity: opacityHero }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge color="cyan">Next Gen Lighting</Badge>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-6 text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 leading-[1.1]"
          >
            BRING DEIN LEBEN<br />
            <span className="text-glow-neon text-white">ZUM LEUCHTEN</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Entdecke die kuratierte Kollektion für futuristische Setups, 
            Smart Homes und atmosphärische Vibes.
          </motion.p>
          
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6, duration: 0.8 }}
             className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <GlassButton variant="primary" glow size="lg" onClick={() => document.getElementById('shop')?.scrollIntoView({behavior: 'smooth'})}>
              Jetzt shoppen <ArrowRight className="w-5 h-5" />
            </GlassButton>
            <Link to="/products?category=bestseller">
              <GlassButton variant="secondary" size="lg">
                Bestseller ansehen
              </GlassButton>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
        >
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
            <div className="w-1 h-1 bg-white rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* CATEGORIES / SHOP SECTION */}
      <section id="shop" className="py-20 px-6 relative z-20 bg-lumio-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
             <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Curated Collection</h2>
             <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
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
          
          <div className="mt-12 text-center">
            <Link to="/products">
              <GlassButton variant="outline" size="lg">
                Alle Produkte anzeigen
              </GlassButton>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-20 bg-lumio-panel border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { icon: Zap, title: "Ultra Energy Efficient", desc: "Modernste LED Technologie spart bis zu 90% Strom." },
               { icon: Box, title: "Premium Qualität", desc: "Handverlesene Materialien und robuster Bau für Langlebigkeit." },
               { icon: TrendingUp, title: "Trending Ästhetik", desc: "Wir kuratieren nur, was auf TikTok und IG viral geht." },
             ].map((feature, idx) => (
               <GlassCard key={idx} className="flex flex-col items-center text-center">
                  <div className="p-4 rounded-full bg-white/5 mb-6 text-lumio-neon">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
               </GlassCard>
             ))}
           </div>
        </div>
      </section>

      {/* INSPIRATION / MASONRY */}
      <section id="inspiration" className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
             <Badge color="accent">Inspiration</Badge>
             <h2 className="text-4xl md:text-6xl font-display font-bold mt-4 mb-6">
               CREATE YOUR <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-lumio-accent to-lumio-hot">DREAM SETUP</span>
             </h2>
             <p className="text-gray-300 text-lg mb-8">
               Egal ob Gaming-Höhle, Home-Office oder Chill-Lounge. Licht verändert alles.
               Lass dich von tausenden Setups unserer Community inspirieren.
             </p>
             <div className="space-y-4">
               {["RGB Sync Technologie", "App Steuerung", "Einfache Installation"].map((item, i) => (
                 <div key={i} className="flex items-center gap-3">
                   <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400">
                     <Check className="w-3 h-3" />
                   </div>
                   <span className="text-gray-200">{item}</span>
                 </div>
               ))}
             </div>
             <div className="mt-10">
               <Link to="/lookbook">
                <GlassButton variant="primary">Lookbook ansehen</GlassButton>
               </Link>
             </div>
          </div>
          
          <div className="md:w-1/2 grid grid-cols-2 gap-4 relative">
             {/* Decorative glows behind images */}
             <div className="absolute inset-0 bg-lumio-accent/30 blur-[100px] -z-10" />
             
             <motion.div 
               whileHover={{ y: -10 }} 
               className="h-64 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
             >
               <img src="https://picsum.photos/400/600?random=20" className="w-full h-full object-cover" alt="Setup" />
             </motion.div>
             <motion.div 
               whileHover={{ y: -10 }} 
               className="h-64 rounded-2xl overflow-hidden border border-white/10 shadow-2xl mt-12"
             >
               <img src="https://picsum.photos/400/600?random=21" className="w-full h-full object-cover" alt="Setup" />
             </motion.div>
             <motion.div 
               whileHover={{ y: -10 }} 
               className="h-64 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
             >
               <img src="https://picsum.photos/400/600?random=22" className="w-full h-full object-cover" alt="Setup" />
             </motion.div>
             <motion.div 
               whileHover={{ y: -10 }} 
               className="h-64 rounded-2xl overflow-hidden border border-white/10 shadow-2xl mt-[-3rem]"
             >
               <img src="https://picsum.photos/400/600?random=23" className="w-full h-full object-cover" alt="Setup" />
             </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-black relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-center mb-12">Community Vibe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <GlassCard key={t.id} className="bg-white/5">
                <div className="flex items-center gap-4 mb-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-lumio-neon" />
                  <div>
                    <h4 className="font-bold text-white">{t.name}</h4>
                    <span className="text-xs text-lumio-neon uppercase">{t.role}</span>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{t.content}"</p>
                <div className="flex gap-1 mt-4">
                  {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="py-24 px-6 relative">
        {/* Optional: Ambient Background Glow behind the card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-lumio-neon/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <GlassCard className="relative overflow-hidden p-8 md:p-12 text-center border border-lumio-neon/30 backdrop-blur-xl bg-black/40 shadow-[0_0_50px_-12px_rgba(var(--lumio-neon-rgb),0.3)]">
             
             {/* Internal Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-br from-lumio-neon/10 via-transparent to-lumio-hot/10 pointer-events-none" />
             
             <div className="relative z-10">
               <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight drop-shadow-lg text-white">
                 JOIN THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-lumio-neon to-lumio-hot">GLOW CLUB</span>
               </h2>
               
               <p className="text-gray-300 mb-8 max-w-lg mx-auto text-lg leading-relaxed">
                 Erhalte exklusive Deals, Setup-Guides und Early-Access zu neuen Drops. Kein Spam, nur Vibes.
               </p>
               
               <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto relative" onSubmit={handleSubscribe}>
                 <div className="relative flex-grow">
                   {/* Accessibility Label */}
                   <label htmlFor="email-address" className="sr-only">Email Adresse</label>
                   
                   {/* Icon */}
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                     <Mail className="h-5 w-5" aria-hidden="true" /> 
                   </div>

                   <input 
                     id="email-address"
                     name="email"
                     type="email" 
                     autoComplete="email"
                     required
                     disabled={isSubscribing}
                     placeholder="Deine Email Adresse" 
                     className="w-full bg-black/60 border border-white/10 rounded-full pl-11 pr-6 py-3 text-white placeholder-gray-500 
                                focus:outline-none focus:border-lumio-neon focus:ring-1 focus:ring-lumio-neon 
                                disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-inner"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                   />
                 </div>

                 <GlassButton 
                   type="submit" 
                   variant="primary" 
                   glow 
                   className="px-8 whitespace-nowrap" 
                   disabled={isSubscribing}
                 >
                   {isSubscribing ? (
                     <span className="flex items-center gap-2">
                       <span className="w-2 h-2 bg-white rounded-full animate-bounce" />
                       <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-75" />
                       <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-150" />
                     </span>
                   ) : 'Anmelden'}
                 </GlassButton>
               </form>
               
               {/* Status Message with Transition */}
               <div className={`mt-6 h-6 text-sm font-medium transition-all duration-500 ease-in-out ${subscribeMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                  {subscribeMessage && (
                    <span className={`${subscribeMessage.includes('Danke') ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'text-rose-400'}`}>
                      {subscribeMessage}
                    </span>
                  )}
               </div>

             </div>
          </GlassCard>
        </div>
      </section>
      
      <Footer />
      
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
};